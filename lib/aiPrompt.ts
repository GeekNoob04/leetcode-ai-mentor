export function generateLeetCodePrompt(summary: {
    username?: string;
    totalSolved?: number;
    growth?: number;
    easy?: number;
    medium?: number;
    hard?: number;
    ranking?: number;
    totalEntries?: number;
}) {
    return `
You are an elite coding mentor. Analyze this LeetCode data and deliver a detailed, no-fluff report with actionable insights.

USER DATA:
${JSON.stringify(summary, null, 2)}

REPORT STRUCTURE:

1. Performance Overview
   - Assess total problems solved and activity consistency
   - Evaluate growth trajectory if data available
   - State skill level: Beginner/Intermediate/Advanced with justification

2. Difficulty Distribution Analysis
   - Calculate Easy/Medium/Hard percentages
   - Critique current distribution against optimal ratios for user's level
   - Identify if practicing in comfort zone or challenging appropriately

3. Strengths and Weaknesses
   - List 2-3 clear strengths based on solving patterns
   - Identify 3-4 specific skill gaps or weak topics
   - Note problematic habits if evident from data

4. Competitive Standing (if ranking available)
   - Calculate percentile and interpret competitive readiness
   - Advise on contest participation vs foundational work priority

5. Strategic Recommendations (5-7 items)
   - Specify exact difficulty focus with reasoning
   - Name algorithmic topics to prioritize
   - Provide weekly volume targets
   - Include methodology improvements (revision strategy, pattern recognition, etc.)

6. 30-Day Action Plan
   - Week 1: [measurable goal with problem count and topics]
   - Week 2: [measurable goal with problem count and topics]
   - Week 3: [measurable goal with problem count and topics]
   - Week 4: [measurable goal with problem count and topics]

OUTPUT RULES:
- Every sentence must deliver insight or specific action
- Be blunt about weaknesses—no sugar coating
- Use ONLY plain text with simple hyphens for lists
- NO markdown formatting: no asterisks, no bold, no italics, no headers with # or ##
- Section titles should be followed by a colon and continue on the same line or next line
- Cut all generic advice—everything must be data-informed
- No repetition of input metrics without interpretation
- If data is limited, state it briefly and infer logically
- Detailed but dense—no unnecessary explanations
- Format output as plain text paragraphs and simple bulleted lists only

Generate the complete report.
`;
}
