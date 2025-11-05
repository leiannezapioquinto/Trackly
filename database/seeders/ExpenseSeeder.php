<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Expense;
use App\Models\Category;
use Illuminate\Support\Arr;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        // If categories table is empty, run CategorySeeder first
        if ($categories->isEmpty()) {
            $this->call(CategorySeeder::class);
            $categories = Category::all();
        }

        $titles = [
            'Lunch at McDonalds',
            'Grab Ride to Office',
            'Grocery Shopping',
            'Netflix Subscription',
            'Electric Bill',
            'Dinner with Friends',
            'New T-shirt',
            'Gas Refill',
            'Cinema Ticket',
            'Phone Load',
            'Coffee at Starbucks',
            'Online Course Subscription',
            'Laundry Payment',
            'Weekend Drinks',
            'Bus Fare'
        ];

        foreach ($titles as $title) {
            Expense::create([
                'title' => $title,
                'description' => 'Sample expense entry for ' . $title,
                'amount' => rand(100, 2000),
                'date' => now()->subDays(rand(0, 30)),
                'category_id' => $categories->random()->id,
            ]);
        }
    }
}
