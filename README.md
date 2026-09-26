# Word search

A simple website to filter words. I originally built it to find words for [Smush](https://www.hankgreen.com/smush/). Don't worry, I'm not gonna cheat using this, it's just a toy based on an idea I had, I quite enjoy the challenge of figuring out the words used in the game. Might be useful for other similar word games, too.

Words list: https://huggingface.co/datasets/ryanjosephkamp/english-openlist

## Build instructions

Clone the repository:

```sh
git clone https://codeberg.org/noClaps/wordsearch
cd wordsearch
```

Fetch the words list.

```sh
make get-words
```

The `src/` directory now has all of the required files for the site to work.
