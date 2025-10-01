"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";

interface Props {
    easy: number;
    medium: number;
    hard: number;
}

export default function ProblemDistributionChart({
    easy,
    medium,
    hard,
}: Props) {
    const data = [
        { name: "Easy", value: easy },
        { name: "Medium", value: medium },
        { name: "Hard", value: hard },
    ];

    return (
        <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Problem Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar
                        dataKey="value"
                        fill="#6366f1"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
