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
            submitStats {
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
        { query, variables },
        { headers: { "Content-Type": "application/json" } }
    );

    if (res.data.errors) {
        throw new Error(res.data.errors[0].message);
    }

    return res.data.data;
}

export async function fetchLeetCodeContestStats(username: string) {
    const query = `
    query getContestRanking($username: String!) {
        userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
        }
        userContestRankingHistory(username: $username) {
            contest {
                title
                startTime
            }
            rating
            ranking
        }
    }`;
    const variables = { username };
    const res = await axios.post(
        "https://leetcode.com/graphql",
        {
            query,
            variables,
        },
        { headers: { "Content-Type": "application/json" } }
    );
    if (res.data.errors) {
        throw new Error(res.data.errors[0].message);
    }
    const data = res.data.data;
    type ContestHistory = {
        contest: {
            title: string;
            startTime: number;
        };
        rating: number;
        ranking: number;
    };
    return {
        attendedContests: data.userContestRanking?.attendedContestsCount ?? 0,
        rating: data.userContestRanking?.rating ?? 0,
        globalRanking: data.userContestRanking?.globalRanking ?? 0,
        topPercentage: data.userContestRanking?.topPercentage ?? 0,
        history: (data.userContestRankingHistory ?? []).map(
            (h: ContestHistory) => ({
                title: h.contest.title,
                startTime: new Date(h.contest.startTime * 1000).toISOString(),
                rating: h.rating,
                ranking: h.ranking,
            })
        ),
    };
}
export async function fetchLeetCodeTopicStats(username: string) {
    const query = `
    query userProfileQuestions($username: String!) {
        matchedUser(username: $username) {
            tagProblemCounts {
                advanced {
                    tagName
                    tagSlug
                    problemsSolved
                }
                intermediate {
                    tagName
                    tagSlug
                    problemsSolved
                }
                fundamental {
                    tagName
                    tagSlug
                    problemsSolved
                }
            }
        }
    }`;
}
