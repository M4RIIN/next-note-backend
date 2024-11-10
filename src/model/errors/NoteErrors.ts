export class NoteErrors extends Error {
    message = "Title should have at least 2 characters."
}

export class ContentLenghtError extends Error {
    message = "Content shouls have at least 1 character."
}