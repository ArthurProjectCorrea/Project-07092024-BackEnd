const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./api/models/userModel"); // Ajuste o caminho conforme necessário

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Verifica se o usuário já existe no banco de dados
      User.findOne({ email: profile.emails[0].value }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser); // Usuário já existe
        } else {
          // Cria um novo usuário
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "", // Pode deixar vazio ou usar outra lógica
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
