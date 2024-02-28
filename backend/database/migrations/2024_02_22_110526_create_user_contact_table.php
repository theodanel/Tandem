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
        Schema::create('user_contact', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained(table: 'users', column: 'id')->cascadeOnDelete();
            $table->foreignId('receiver_id')->constrained(table: 'users', column: 'id')->cascadeOnDelete();
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations. 
     */
    public function down(): void
    {
        Schema::dropIfExists('user_contact');
    }
};
