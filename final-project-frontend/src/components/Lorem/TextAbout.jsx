import React from 'react'
import './Lorem.scss'
const TextAbout = () => {
  return (
    <div className="text-start fw-semibold tilt-in-left-1">
      <p className="text-about">
        Hello dear user, you have reached the about page and I will explain the
        concept of the site I created, the concept of the site is an online
        store for Playstation games where there is a selection of games for
        purchase, each game has a details page on it and an add to cart button,
        as soon as you add a game to the cart a notification pops up that you
        have added the The game to the cart and do you want to continue shopping
        or want to get to the cart and then you will be able to see all the
        products you have added so far, of course, all the products will be
        saved in the cart even if you leave the site. As soon as you want to
        make a payment, you will be redirected to the site's login page. If you
        have not registered on the site, you will have to register and meet all
        the requirements for registration. Once you have completed your
        registration, you will be able to log in and go to the payment page
        where you can enter your credit card information. The site also has a
        login page for the admin, as soon as the admin logs in, a link will open
        for him in the navigation bar that will take him to a page where he can
        edit, delete and add games and thus be able to manage the store in the
        best possible way. All the fields that the admin or the user fills in
        have several validations both on the server side and on the client side.{" "}
        <br />
        <span className="text-bold">
          I hope that in the meantime you are having a pleasant experience while
          browsing my site.
        </span>
      </p>
    </div>
  );
}

export default TextAbout