def read_rankings(data):
    journals = {"scopus": 100,"web_of_science": 2.9, "others":1}
    with open("static/src/ratings.txt", "r") as filereader:
        bank = {i*10 :list(map(float, filereader.readline().split(", "))) for i in range(10)}
    for i in range(10):
        bank = {i * 10: list(map(float, ))}
    print(data["cite_score"])
    row = (int(data["cite_score"]) // 10) *10
    column = int(data["cite_score"]) % 10
    if data["journal"] == "scopus":
        c_score = journals[data["journal"]] * bank[row][column]
    else:
        c_score = journals[data["journal"]]
    return c_score