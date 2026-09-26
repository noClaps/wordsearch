get-words:
	@curl -L "https://huggingface.co/datasets/ryanjosephkamp/english-openlist/raw/main/data/merged_valid_words.txt" -o src/words.txt
