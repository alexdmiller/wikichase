import requests
import wikipediaapi
session = requests.Session()

# def findLinks(name):
#     url = "https://en.wikipedia.org/w/api.php"
#     params = {
#         "action": "query",
#         "format": "json",
#         "titles": name,
#         "prop": "links",
#         "pllimit": "max"
#     }

#     response = session.get(url=url, params=params)
#     data = response.json()
#     pages = data["query"]["pages"]

#     pg_count = 1
#     page_titles = []

#     for key, val in pages.items():
#         for link in val["links"]:
#             page_titles.append(link["title"].lower())

#     while "continue" in data:
#         plcontinue = data["continue"]["plcontinue"]
#         params["plcontinue"] = plcontinue

#         response = session.get(url=url, params=params)
#         data = response.json()
#         pages = data["query"]["pages"]

#         pg_count += 1

#         for key, val in pages.items():
#             for link in val["links"]:
#                 page_titles.append(link["title"].lower())

#     return page_titles

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
    print(page.title)
    print('=' * len(page.title))
    print(page.summary.split('\n')[0])
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
print()
printPageInfo(current)
print()
# print(current.links)

while True:
    guess = input("> ").lower()
    lowered = list(map(lambda x : x.lower(), current.links))
    while not guess in lowered:
        if guess == 'help':
            print('\n'.join(current.links))
        guess = input("> ").lower()
    current = wikipedia.page(guess)
    printPageInfo(current)


