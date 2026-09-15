const TODO_TITLE_MAX_LENGTH = 100;

export function validateTodoTitle(title) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return "Todo title is required.";
  }

  if (trimmedTitle.length > TODO_TITLE_MAX_LENGTH) {
    return `Todo title must be ${TODO_TITLE_MAX_LENGTH} characters or fewer.`;
  }

  return "";
}

export function isValidTodoTitle(title) {
  return validateTodoTitle(title) === "";
}
