<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->boolean('open')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete()->default(5);
            $table->integer('collaborators')->nullable();
            $table->integer('collaborators_max')->nullable();
            $table->integer('popularity')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('creator')->constrained(table: 'users', column: 'id')->cascadeOnDelete()->nullable();
            $table->boolean('open')->nullable();
            $table->foreignId('status')->constrained(table: 'statuses', column: 'id')->cascadeOnDelete()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
