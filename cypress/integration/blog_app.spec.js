describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.clearLocalStorage();
    const user = {
      name: 'Lakshay',
      username: 'wisekaiser',
      password: 'laksh2309',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('wisekaiser');
      cy.get('#password').type('laksh2309');
      cy.contains('login').click();

      cy.contains('Lakshay is logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('wisekaiser');
      cy.get('#password').type('wrong');
      cy.contains('login').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(169, 68, 66)');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'wisekaiser', password: 'laksh2309' });
    });

    it('a new blog can be created', () => {
      cy.contains('Create new blog').click();
      cy.get('#title').type('The Perks of Being a Wallflower');
      cy.get('#author').type('Emma Watson');
      cy.get('#url').type('www.blank.org');
      cy.get('#create-blog-button').click();

      cy.contains('The Perks of Being a Wallflower');
    });

    it('a new blog can be liked', () => {
      cy.createBlog({
        title: 'The Perks of Being a Wallflower',
        author: 'Emma Watson',
        url: 'www.blank.org',
      });

      cy.contains('The Perks of Being a Wallflower')
        .contains('view').click()
        .get('.blog-like-button')
        .click();

      cy.contains('likes 1');
    });

    it('the user who created a blog can delete it', () => {
      cy.createBlog({
        title: 'The Perks of Being a Wallflower',
        author: 'Emma Watson',
        url: 'www.blank.org',
      });

      cy.contains('The Perks of Being a Wallflower')
        .contains('view').click()
        .get('.blog-remove-button')
        .click();

      cy.get('.fullblog').should('not.exist');
    });

    it('the blogs are ordered in descending order of likes', () => {
      cy.createBlog({
        title: 'The Perks of Being a Wallflower',
        author: 'Emma Watson',
        url: 'www.blank.org',
        likes: 1,
      });

      cy.createBlog({
        title: 'The Life of Pi',
        author: 'Yann Martel',
        url: 'www.pi.com',
        likes: 8,
      });

      cy.createBlog({
        title: 'Deep Dive into the World of Containers',
        author: 'GDG',
        url: 'www.gdg.com',
        likes: 2,
      });

      cy.get('.view-full-blog').should('have.length', 3).click({ multiple: true });

      cy.get('.blog-likes').then((likes) => {
        expect(likes[0]).to.contain(8);
        expect(likes[1]).to.contain(2);
        expect(likes[2]).to.contain(1);
      });
    });
  });
});
