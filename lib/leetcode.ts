import axios from "axios";

export async function fetchLeetCodeStats(username: string) {
    const query = `
    query getUserProfile($username: String!) {
        matchedUser(username: $username) {
        username
            profile {
                ranking
                reputation
            }
            submitStats: submitStatsGlobal {
            acSubmissionNum {
                difficulty
                count
            }
            totalSubmissionNum {
                difficulty
                count
            }   
        }
    }
}`;
    const variables = { username };
    const res = await axios.post(
        "https://leetcode.com/graphql",
        {
            query,
            variables,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (res.data.errors) {
        throw new Error(res.data.errors[0].message);
    }
    return res.data.data;
}
