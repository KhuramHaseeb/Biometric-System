import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/login`);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-md-center">
          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
            <div className="login-screen">
              <div className="login-box">
                <Link to="/" className="login-logo">
                  <span className="text-danger">R</span>
                  <span className="text-warning">e</span>
                  <span className="text-success">t</span>
                  <span className="text-info">a</span>
                  <span className="text-royal-orange">i</span>
                  <span className="text-jungle-green">l</span>
                </Link>
                <h5>
                  Welcome,
                  <br />
                  Create your Admin Account.
                </h5>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <small id="passwordHelpInline" className="text-muted">
                    Password must be 8-20 characters long.
                  </small>
                </div>
                <div className="actions">
                  <button type="submit" className="btn btn-primary">
                    Signup
                  </button>
                </div>
                <div className="or">
                  <span>or Signup Using</span>
                </div>
                <div className="d-flex justify-content-around">
                  {/* text-right */}
                  <button type="submit" className="btn btn-twitter">
                    Twitter
                  </button>
                  <button type="submit" className="btn btn-facebook">
                    Facebook
                  </button>
                  <button type="submit" className="btn btn-gplus">
                    Gmail
                  </button>
                </div>
                <div className="m-0">
                  <span className="additional-link">
                    Already have an account? <Link to="/login">Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
