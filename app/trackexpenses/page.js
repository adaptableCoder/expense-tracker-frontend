"use client"
import React, { useContext, useState, useEffect, useMemo } from 'react'
import { UserContext } from '@/context/UserContext'
import { Label, Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import ExpenseCards from '@/components/ExpenseCards';

const categoryColors = [
    { category: "Rent / Mortgage", fill: "#f0fdf4" },
    { category: "Utilities (Electricity, Water, Gas)", fill: "#dcfce7" },
    { category: "Internet / Phone", fill: "#bbf7d0" },
    { category: "Home Maintenance / Repairs", fill: "#86efac" },
    { category: "Groceries", fill: "#4ade80" },
    { category: "Dining Out (Restaurants, Cafés)", fill: "#22c55e" },
    { category: "Snacks / Beverages", fill: "#16a34a" },
    { category: "Fuel", fill: "#15803d" },
    { category: "Public Transit / Ride-Sharing", fill: "#166534" },
    { category: "Parking / Tolls", fill: "#14532d" },
    { category: "Vehicle Maintenance / Repairs", fill: "#134e26" },
    { category: "Health, Car, Home, Life Insurance", fill: "#0f381e" },
    { category: "Loan Payments (Student, Auto, etc.)", fill: "#0d2919" },
    { category: "Credit Card Payments", fill: "#0b1f14" },
    { category: "Savings & Investments", fill: "#09170f" },
    { category: "Doctor, Dental & Vision Care", fill: "#064e3b" },
    { category: "Medications", fill: "#065f46" },
    { category: "Personal Care (Haircuts, Salons)", fill: "#047857" },
    { category: "Fitness / Gym Memberships", fill: "#059669" },
    { category: "Movies, Concerts, and Events", fill: "#10b981" },
    { category: "Hobbies", fill: "#34d399" },
    { category: "Subscriptions (Streaming, Magazines)", fill: "#6ee7b7" },
    { category: "Tuition / School Fees", fill: "#a7f3d0" },
    { category: "Books & Supplies", fill: "#d1fae5" },
    { category: "Childcare / Babysitting", fill: "#ecfdf5" },
    { category: "Extracurricular Activities", fill: "#bbf7d0" },
    { category: "Transportation (Flights, Trains, etc.)", fill: "#99f6e4" },
    { category: "Accommodation", fill: "#5eead4" },
    { category: "Dining & Activities on Vacation", fill: "#2dd4bf" },
    { category: "Travel Insurance", fill: "#14b8a6" },
    { category: "Gifts (Birthdays, Holidays)", fill: "#0d9488" },
    { category: "Charitable Donations", fill: "#0f766e" },
    { category: "Pet Care (Food, Vet Visits)", fill: "#115e59" },
    { category: "Office / Stationery Supplies", fill: "#134e4a" },
    { category: "Emergency Fund", fill: "#1e3a8a" },
    { category: "Taxes", fill: "#1d4ed8" },
    { category: "Retirement Contributions", fill: "#3b82f6" },
    { category: "Special Projects (Home Renovations, etc.)", fill: "#eff6ff" },
    { category: "Major Purchases (Appliances, Electronics)", fill: "#e0f2fe" },
    { category: "Seasonal Expenses (Holidays, Back to School)", fill: "#bae6fd" },
    { category: "Clothing & Accessories", fill: "#93c5fd" },
    { category: "Online Courses / Workshops", fill: "#60a5fa" },
    { category: "Professional Development", fill: "#3b82f6" },
    { category: "Other / Uncategorized Expenses", fill: "#102a25" },
];

const TrackExpenses = () => {
    const { username } = useContext(UserContext);
    const [expenses, setExpenses] = useState([]);
    const [smallestExpenses, setSmallestExpenses] = useState([]);
    const [largestExpenses, setLargestExpenses] = useState([]);
    const [currentMonthExpenses, setCurrentMonth] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:8080/api/trackExpenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });

                const data = await response.json();
                const allExpenses = data.all_expenses || [];
                const largestExpenses = data.largest || [];
                const smallestExpenses = data.smallest || [];
                const currentMonth = data.current_month || [];

                setExpenses(allExpenses);
                setLargestExpenses(largestExpenses);
                setSmallestExpenses(smallestExpenses);
                setCurrentMonth(currentMonth);

                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        fetchExpenseData();
    }, []);

    // Calculate chartData based on actual expenses
    const chartData = useMemo(() => {
        // Create a map to store the sum of amounts for each category
        const categoryAmounts = {};

        // Sum up amounts by category
        expenses.forEach(expense => {
            const { category, amount } = expense;
            if (!categoryAmounts[category]) {
                categoryAmounts[category] = 0;
            }
            categoryAmounts[category] += parseFloat(amount);
        });

        // Map the data to match the required format for the chart
        return categoryColors.map(item => {
            return {
                ...item,
                amount: categoryAmounts[item.category] || 0, // Use 0 if no expenses in this category
            };
        }).filter(item => item.amount > 0); // Only include categories with expenses
    }, [expenses]);

    // Create chart config based on dynamic chartData
    const chartConfig = useMemo(() => {
        return chartData.reduce((acc, item) => {
            acc[item.category] = { label: item.category, color: item.fill };
            return acc;
        }, {});
    }, [chartData]);

    const totalAmount = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0);
    }, [chartData]);

    // Calculate current month chart data
    const currentMonthChartData = useMemo(() => {
        // Create a map to store the sum of amounts for each category
        const categoryAmounts = {};

        // Sum up amounts by category for current month
        currentMonthExpenses.forEach(expense => {
            const { category, amount } = expense;
            if (!categoryAmounts[category]) {
                categoryAmounts[category] = 0;
            }
            categoryAmounts[category] += parseFloat(amount);
        });

        // Map the data to match the required format for the chart
        return categoryColors.map(item => {
            return {
                ...item,
                amount: categoryAmounts[item.category] || 0, // Use 0 if no expenses in this category
            };
        }).filter(item => item.amount > 0); // Only include categories with expenses
    }, [currentMonthExpenses]);

    // Create chart config for current month
    const currentMonthChartConfig = useMemo(() => {
        return currentMonthChartData.reduce((acc, item) => {
            acc[item.category] = { label: item.category, color: item.fill };
            return acc;
        }, {});
    }, [currentMonthChartData]);

    const currentMonthTotalAmount = useMemo(() => {
        return currentMonthChartData.reduce((acc, curr) => acc + curr.amount, 0);
    }, [currentMonthChartData]);

    return (
        <div className="w-[80%] min-h-[90dvh] p-6 flex flex-col items-center">
            <div className="w-[100%] flex flex-col items-center justify-center gap-2 my-8">
                <h1 className="text-white text-4xl">Hey, <span className="text-[#00FF87]">{username}!</span></h1>
                <h2 className="text-[#868686] text-lg text-center">Welcome to the Tracking Page.<br />Here you can see the various stats of your expenses.</h2>
            </div>

            <div className="w-[100%] h-[80dvh] flex flex-col items-center">
                <div className="w-[100%] pb-6">
                    <h2 className="text-4xl text-white text-center">All Expenses</h2>
                </div>

                <div className="w-[100%] h-full flex overflow-hidden">
                    <div className="w-[50%] h-full pr-4">
                        <div className="h-full overflow-y-auto">
                            {isLoading ? (
                                <p className="text-[#868686] w-full text-center">Loading expense data...</p>
                            ) : error ? (
                                <p className="text-red-500 w-full text-center">Error: {error}</p>
                            ) : expenses.length === 0 ? (
                                <p className="text-[#868686] w-full text-center">No expense data available</p>
                            ) : (
                                <ExpenseCards expenses={expenses} color="#00FF87"/>
                            )}
                        </div>
                    </div>

                    <div className="w-[50%] h-full flex items-center justify-center">
                        <Card className="w-[90%]">
                            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-2xl font-bold text-black text-center">Category-wise all Expenses</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-0">
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-square max-h-[250px]"
                                >
                                    <PieChart>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Pie
                                            data={chartData}
                                            dataKey="amount"
                                            nameKey="category"
                                            innerRadius={60}
                                            strokeWidth={5}
                                        >
                                            <Label
                                                content={({ viewBox }) => {
                                                    if (viewBox?.cx && viewBox?.cy) {
                                                        return (
                                                            <text
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                            >
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy}
                                                                    className="fill-foreground text-3xl font-bold"
                                                                >
                                                                    ₹{totalAmount.toLocaleString()}
                                                                </tspan>
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy + 24}
                                                                    className="fill-muted-foreground"
                                                                >
                                                                    Expenses
                                                                </tspan>
                                                            </text>
                                                        );
                                                    }
                                                }}
                                            />
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-sm">
                                <div className="leading-none text-muted-foreground">
                                    Showing total expenses till now
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="w-[120%] my-5 border border-t border-[#454444]"></div>

            <div className="w-[100%] min-h-[80dvh] flex">
                <div className="w-[50%] min-h-[100%] flex flex-col items-center border-r border-[#868686]">
                    <h2 className="w-[100%] text-2xl text-white text-center mb-6">Some of Your Largest Expenses</h2>
                    {isLoading ? (
                        <p className="text-[#868686]">Loading expense data...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : largestExpenses.length === 0 ? (
                        <p className="text-[#868686]">No expense data available</p>
                    ) : (
                        <ExpenseCards expenses={largestExpenses} color="#FF0000"/>
                    )}
                </div>

                <div className="w-[50%] min-h-[100%] flex flex-col items-center">
                    <h2 className="w-[100%] text-2xl text-white text-center mb-6">Some of Your Smallest Expenses</h2>
                    {isLoading ? (
                        <p className="text-[#868686]">Loading expense data...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : smallestExpenses.length === 0 ? (
                        <p className="text-[#868686]">No expense data available</p>
                    ) : (
                        <ExpenseCards expenses={smallestExpenses} color="#00FF87"/>
                    )}
                </div>
            </div>

            <div className="w-[120%] my-5 border border-t border-[#454444]"></div>

            <div className="w-[100%] h-[80dvh] flex flex-col item-center">
                <div className="w-[100%] py-6">
                    <h2 className="text-4xl text-white text-center">This Month's Expenses</h2>
                </div>

                <div className="w-[100%] h-full flex overflow-hidden">
                    <div className="w-[50%] h-full pr-4">
                        <div className="h-full overflow-y-auto">
                            {isLoading ? (
                                <p className="text-[#868686] w-full text-center">Loading expense data...</p>
                            ) : error ? (
                                <p className="text-red-500 w-full text-center">Error: {error}</p>
                            ) : currentMonthExpenses.length === 0 ? (
                                <p className="text-[#868686] w-full text-center">No expense data available</p>
                            ) : (
                                <ExpenseCards expenses={currentMonthExpenses} color="#00FF87"/>
                            )}
                        </div>
                    </div>

                    <div className="w-[50%] h-full flex items-center justify-center">
                        <Card className="w-[90%]">
                            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-2xl font-bold text-black text-center">Category-wise this Month's Expenses</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-0">
                                <ChartContainer
                                    config={currentMonthChartConfig}
                                    className="mx-auto aspect-square max-h-[250px]"
                                >
                                    <PieChart>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Pie
                                            data={currentMonthChartData}
                                            dataKey="amount"
                                            nameKey="category"
                                            innerRadius={60}
                                            strokeWidth={5}
                                        >
                                            <Label
                                                content={({ viewBox }) => {
                                                    if (viewBox?.cx && viewBox?.cy) {
                                                        return (
                                                            <text
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                            >
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy}
                                                                    className="fill-foreground text-3xl font-bold"
                                                                >
                                                                    ₹{currentMonthTotalAmount.toLocaleString()}
                                                                </tspan>
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy + 24}
                                                                    className="fill-muted-foreground"
                                                                >
                                                                    Expenses
                                                                </tspan>
                                                            </text>
                                                        );
                                                    }
                                                }}
                                            />
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-sm">
                                <div className="leading-none text-muted-foreground">
                                    Showing this month's total expenses till now
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackExpenses
