'use strict'
const Book = use('App/Models/Book')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with books
 */
class BookController {
  /**
   * Show a list of all books.
   * GET books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let books = await Book.all();
    return response.status(200).json(books);
  }

  /**
   * Render a form to be used for creating a new book.
   * GET books/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new book.
   * POST books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const bookInfo = request.only(['title', 'isbn', 'author']);
    const book = new Book;
    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.author = bookInfo.author;
    await book.save();
    return response.status(200).json(book);
  }

  /**
   * Display a single book.
   * GET books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const book = await Book.find(params.id);
    if(!book){
      return response.status(404).json({data: "Recurso no encontrado"});
    }
    return response.status(200).json(book);
  }

  /**
   * Render a form to update an existing book.
   * GET books/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const bookInfo = request.only(['title', 'isbn', 'author']);
    const book = await Book.find(params.id);

    if(!book){
      return response.status(404).json({data: "Recurso no encontrado"});
    }

    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.author = bookInfo.author;
    await book.save();
    return response.status(200).json(book);
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const book = await Book.find(params.id);
    if(!book){
      return response.status(404).json({data: "Recurso no encontrado"});
    }
    await book.delete();
    return response.status(204).json(null);
  }
}

module.exports = BookController
