<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpenseController extends Controller
{
    public function index()
    {
        return response()->json(Expense::with('category')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        $expense = Expense::create($validated);

        return response()->json($expense, 201);
    }

    public function show(Expense $expense)
    {
        return response()->json($expense->load('category'));
    }

    public function overallExpenses()
    {
        $data = DB::table('expenses')
            ->select(
                DB::raw("DATE_FORMAT(date, '%b %Y') as month"),
                DB::raw("SUM(amount) as total_amount"),
                DB::raw("MIN(date) as first_date")
            )
            ->groupBy('month')
            ->orderBy('first_date', 'asc')
            ->get();

        return response()->json($data);
    }

    public function trends()
    {
        $data = DB::table('expenses')
            ->select(
                DB::raw("DATE_FORMAT(date, '%b %Y') as month"),
                DB::raw("SUM(amount) as total")
            )
            ->groupBy('month')
            ->orderBy(DB::raw("MIN(date)"))
            ->get();

        return response()->json($data);
    }

    public function topCategories()
    {
        $ranked = DB::table('expenses as e')
            ->join('categories as c', 'c.id', '=', 'e.category_id')
            ->select(
                DB::raw("DATE_FORMAT(e.date, '%b %Y') as month"),
                'c.name as category',
                DB::raw("SUM(e.amount) as amount")
            )
            ->groupBy('month', 'c.name')
            ->orderBy(DB::raw("MIN(e.date)"))
            ->get()
            ->groupBy('month')
            ->map(function ($monthGroup) {
                return $monthGroup->sortByDesc('amount')->first();
            })
            ->values();

        return response()->json($ranked);
    }

    public function update(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        $expense->update($validated);

        return response()->json($expense);
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();
        return response()->json(null, 204);
    }
}
