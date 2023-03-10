<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'nome',
        'preco',
        'descricao',
        'cor',
        'peso'
    ];
}
