const playRepoContract = require("./../src/rps/contracts/roundRepoContract")
const FakeRepoFactory = require("./../src/FakeRepoFactory")

playRepoContract(FakeRepoFactory)
