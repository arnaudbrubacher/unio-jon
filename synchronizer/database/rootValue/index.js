import person from "./person.js"
import election from "./election.js"
import ballot from "./ballot.js"
import personElection from "./person_election.js"

export default { ...ballot, ...person, ...election, ...personElection }
