def read_rankings(data, journals):
	"""
		calculates the citation score ratings based on read_rankings.
	Input:
	------
	data: publication information
	journals: journal_names	

	Output:
	-------
	c_score: float
	"""
	with open("ratings.txt", "r") as filereader:
		bank = {i*10 :list(map(float, filereader.readline().split(", "))) for i in range(10)}
		print(data["cite_score"])
		row = (int(data["cite_score"]) // 10) *10
		column = int(data["cite_score"]) % 10
		if data["journal"] == "scopus":
			c_score = journals[data["journal"]] * bank[row][column]
		else:
			c_score = journals[data["journal"]]
    return c_score
