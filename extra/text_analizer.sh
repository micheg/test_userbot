#!/bin/bash

# Assumiamo che il nome del file sia passato come primo argomento
file=$1

# Verifica se il file esiste
if [ ! -f "$file" ]; then
  echo "File $file non trovato"
  exit 1
fi

# Conta il numero totale di parole
word_count=$(cat $file | wc -w)

# Conta il numero totale di lettere
letter_count=$(cat $file | tr -d '[:space:]' | wc -m)

# Conta il numero di spazi
space_count=$(cat $file | tr -cd ' ' | wc -c)

# Trova le parole che si ripetono più di 10 volte e conta le loro occorrenze
frequent_words=$(cat $file | tr -s '[:space:]' '\n' | tr '[:upper:]' '[:lower:]' | sort | uniq -c | awk '$1 > 10 { print $2 ": " $1 }')

# Stampare i risultati
echo "Numero totale di parole nel file: $word_count"
echo "Numero totale di lettere nel file: $letter_count"
echo "Numero di spazi nel file: $space_count"
echo "Parole che si ripetono più di 10 volte:"
echo "$frequent_words"

