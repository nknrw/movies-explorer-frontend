// сюда вынести дурейшин (время для короткометражек),
// валидацию и прочие константы
import React from "react";

export const durationTime = (movie) =>`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;

export const ERROR_INPUT_SEARCH_MOVIES = "Нужно ввести ключевое слово";

export const EMAIL_PATTERN = '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$';

export const WIDTH_WIDESCREEN = {first: 12, extra: 3};
export const WIDTH_TABLET = {first: 8, extra: 2}
export const WIDTH_MOBILE = {first: 5, extra: 2}
