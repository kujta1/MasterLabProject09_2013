package controllers;

import Model.User;
import controllers.securesocial.SecureSocial;
import play.data.validation.Email;
import play.data.validation.Equals;
import play.data.validation.Required;
import play.mvc.Controller;
import play.mvc.With;

//import models.*;
@With(SecureSocial.class)
public class Application extends Controller {

    public static void index() {
        render();
    }

    // checking if email and password are OK
    public static void authenticate(String email, String password) {
        User user = User.findByEmail(email);
        if (user == null || !user.checkPassword(password)) {
            System.out.println("not successfully");
            flash.error("Bad email or bad password");
            flash.put("email", email);
            // redirect somewhere
        }
        connect(user);
        flash.success("Welcome %s !", user.name);
        //redirect somewhere
    }

    // creating a session
    static void connect(User user) {
        session.put("logged", user.id);
    }

    // get the user which is logged ON
    static User connectedUser() {
        String userId = session.get("logged");
        return userId == null ? null : (User) User.findById(Long.parseLong(userId));
    }

    public static void login() {
        //render();
    }

    //logout
    public static void logout() {

        flash.success("You've been logged out");
        session.clear();
        //redirect to main page or to logout page
    }

    //register  ( we jhave two password fields  password and verify password
    public static void register(@Required String name, @Required @Email String email, @Required String password, @Equals("password") String password2) {
        if (validation.hasErrors() || User.findByEmail(email) != null) {
            validation.keep();
            params.flash();
            String error = "";
            if (User.findByEmail(email) != null) {
                // tell him that this ID already exists
            } else {
                // tell to user that his email or paswword does not match
            }

        } else {
            User user = new User(email, password2, name);
            user.save();
            // redirect somewhere


        }

    }
}