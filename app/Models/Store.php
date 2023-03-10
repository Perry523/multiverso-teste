<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Store extends Model
{
    protected $fillable = [
        'nomeFantasia',
        'cnpj',
        'city_id',
        'nicho',
        'endereco'
    ];
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
