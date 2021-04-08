import React from "react";
import PageHeader from "../../utils/PageHeader";
import "../../assets/css/pricing.css";

const Pricing = () => {
  return (
    <div className="main-container">
      <PageHeader />
      <div className="content-wrapper">
        {/* Row start */}
        <div className="row gutters">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="pricing-plan">
              <div className="pricing-header">
                <h4 className="pricing-title">Starter</h4>
                <div className="pricing-cost">$129.00</div>
                <div className="pricing-save">Save $29.00</div>
              </div>
              <ul className="pricing-features">
                <li>5GB Linux Web Space</li>
                <li>5 MySQL Databases</li>
                <li>500 Emails</li>
                <li>250Gb mothly Transfer</li>
                <li className="text-muted">
                  <del>24/7 Tech Support</del>
                </li>
                <li className="text-muted">
                  <del>Daily Backups</del>
                </li>
              </ul>
              <div className="pricing-footer">
                <a href="#" className="btn btn-dark btn-lg">
                  Select Plan
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="pricing-plan">
              <div className="pricing-header green">
                <h4 className="pricing-title">Basic</h4>
                <div className="pricing-cost">$189.00</div>
                <div className="pricing-save">Save $49.00</div>
              </div>
              <ul className="pricing-features">
                <li>10GB Linux Web Space</li>
                <li>10 MySQL Databases</li>
                <li>1000 Emails</li>
                <li>750Gb mothly Transfer</li>
                <li>24/7 Tech Support</li>
                <li className="text-muted">
                  <del>Daily Backups</del>
                </li>
              </ul>
              <div className="pricing-footer">
                <a href="#" className="btn btn-dark btn-lg">
                  Select Plan
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="pricing-plan">
              <div className="pricing-header orange">
                <h4 className="pricing-title">Ultra</h4>
                <div className="pricing-cost">$219.00</div>
                <div className="pricing-save">Save $99.00</div>
              </div>
              <ul className="pricing-features">
                <li>50GB Linux Web Space</li>
                <li>100 MySQL Databases</li>
                <li>Unlimited Emails</li>
                <li>1000Gb mothly Transfer</li>
                <li>24/7 Tech Support</li>
                <li>Daily Backups</li>
              </ul>
              <div className="pricing-footer">
                <a href="#" className="btn btn-dark btn-lg">
                  Select Plan
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Row end */}
      </div>
    </div>
  );
};

export default Pricing;
