import requests
import wikipediaapi
from difflib import SequenceMatcher

session = requests.Session()

def getRandomArticle():
    URL = "https://en.wikipedia.org/w/api.php"

    PARAMS = {
        "action": "query",
        "format": "json",
        "list": "random",
        "rnlimit": "1",
        "rnnamespace": 0
    }

    R = session.get(url=URL, params=PARAMS)
    DATA = R.json()

    RANDOMS = DATA["query"]["random"]
    return RANDOMS[0]["title"]


def printPageInfo(page):
    print()
    print(page.title)
    print('=' * len(page.title))
    print(page.summary.split('\n')[0][:300], '...')
    print()
    # print('\n'.join(page.links))

print("+----------------------+")
print("| WELCOME TO WIKICHASE |")
print("+----------------------+")
print()
print("May the best wiki-er win.")
print("No cheating!!! (looking at you abe)")
print()
print("(c) Alexander Miller, 2020, all rights reserved, trademarks")

wikipedia = wikipediaapi.Wikipedia('en')
current = wikipedia.page(getRandomArticle())
printPageInfo(current)
# print(current.links)

bad_words = ['category:', 'template:', 'help:', 'module:', 'wikipedia:', 'template talk:', 'file:', 'portal:', 'talk:', 'book:']

while True:
    guess = ''

    loweredToLink = { key.lower(): value for (key, value) in current.links.items() }
    lowered = loweredToLink

    for bad_word in bad_words:
        lowered = list(filter(lambda x : not bad_word in x, lowered))

    while not guess in lowered:
        guess = input("> ").lower()
        if guess == 'help':
            print('\n'.join(lowered))
        else:
            candidates = list(map(lambda x : (x, SequenceMatcher(None, x, guess).ratio()), lowered))
            candidates = list(filter(lambda x : x[1] > 0.8, candidates))
            candidates.sort(reverse=True, key=lambda x: x[1])
            if len(candidates) == 1:
                guess = candidates[0][0]
                print('-->', guess)
            else:
                print('\n'.join([c[0] for c in candidates]))
            
    current = loweredToLink[guess]

    printPageInfo(current)


