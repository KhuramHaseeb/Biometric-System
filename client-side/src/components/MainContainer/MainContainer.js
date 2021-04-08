import React from "react";
import notification_success from "../../assets/img/notification-success.svg";
import notification_danger from "../../assets/img/notification-danger.svg";
import notification_info from "../../assets/img/notification-info.svg";
import star_selected from "../../assets/img/star-selected.svg";
import PageHeader from "../../utils/PageHeader";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const userDetails = useSelector((state) => state.root.userDetails);
  return (
    <div className="main-container">
      <PageHeader
        title={`Welcome back, ${
          userDetails.auth.firstName + " " + userDetails.auth.lastName
        }`}
      />
      <div className="content-wrapper">
        {/* ************************** Visitors and Revenue
         ************************** */}
        {/* Row start */}
        <div className="row gutters justify-content-center">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="daily-sales">
              <h6>Customers</h6>
              <h1>10,000</h1>
              <p>Total Customers</p>
              <div id="apexLineChartGradient" className="blue-graph" />
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="daily-sales">
              <h6>Revenue</h6>
              <h1>45,000</h1>
              <p>Total Revenue</p>
              <div id="apexLineChartGradient2" className="red-graph" />
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="daily-sales">
              <h6>Expenses</h6>
              <h1>23,000</h1>
              <p>Total Expenses</p>
              <div id="apexLineChartGradient3" className="green-graph" />
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="daily-sales">
              <h6>Profit</h6>
              <h1>22,000</h1>
              <p>Total Profit</p>
              <div id="apexLineChartGradient4" className="lavandar-graph" />
            </div>
          </div>
        </div>
        {/* Row end */}
        {/* Row start */}
        <div className="row gutters justify-content-center">
          <div className="col-xl-11 col-lg-12 col-md-12 col-sm-12 col-12">
            {/* Row start */}
            <div className="row no-gutters">
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="daily-sales">
                  <h6>Emails</h6>
                  <h1>21</h1>
                  <p>Total Emails Sent</p>
                  <div id="apexColumnBasic" className="orange-graph" />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="daily-sales">
                  <h6>SMS</h6>
                  <h1>25</h1>
                  <p>Total SMS Sent</p>
                  <div id="apexColumnBasic2" className="yellow-graph" />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="daily-sales">
                  <h6>Deals</h6>
                  <h1>9</h1>
                  <p>Total Deals Claimed</p>
                  <div id="apexColumnBasic3" className="blue-graph" />
                </div>
              </div>
            </div>
            {/* Row end */}
          </div>
        </div>
        {/* Row end */}
        {/* Row start */}
        <div className="row gutters">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Rvenue</div>
                <div className="card-sub-title">
                  Overall Sales Revenue and Profits Performance Online and
                  Offline for Q1 to Q4.
                </div>
              </div>
              <div className="card-body btm-bdr blue pb-0">
                <div className="revenue">
                  <div className="revenue-header">
                    <span className="revenue-number">2750</span>
                    <i className="icon-trending_up text-success" />
                    <small>15.25%</small>
                  </div>
                  <div id="apexOrders" className="blue-graph" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Traffic Source</div>
                <div className="card-sub-title">
                  Overall Traffic Source and Referral Performance Online and
                  Offline for Q1 to Q4.
                </div>
              </div>
              <div className="card-body btm-bdr green pb-0">
                <div className="traffic">
                  <div className="traffic-header">
                    <span className="traffic-number">5000</span>
                    <i className="icon-trending_down text-danger" />
                    <small>10.75%</small>
                  </div>
                  <div id="traffic" className="orange-graph" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Overall Product Rating</div>
                <div className="card-sub-title">
                  250 out of 250(100%) reviewers would recommend this products
                  rating for Q1 to Q4.
                </div>
              </div>
              <div className="card-body btm-bdr orange pb-0">
                <div className="overall-rating">
                  <div className="rating-header">
                    <span className="rating-number">5.0</span>
                    <div className="rating-box">
                      <img src={star_selected} className="star" alt="Rating" />
                      <img src={star_selected} className="star" alt="Rating" />
                      <img src={star_selected} className="star" alt="Rating" />
                      <img src={star_selected} className="star" alt="Rating" />
                      <img src={star_selected} className="star" alt="Rating" />
                    </div>
                  </div>
                  <div id="overAllRating" className="sea-blue-graph" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Deals</div>
                <div className="card-sub-title">
                  Overall Deals Revenue and Profits Performance Online and
                  Offline for Q1 to Q4.
                </div>
              </div>
              <div className="card-body btm-bdr pink pb-0">
                <div className="deals">
                  <div className="deals-header">
                    <span className="deals-number">3,500</span>
                    <i className="icon-trending_up text-success" />
                    <small>25.9%</small>
                  </div>
                  <div id="deals" className="pink-graph" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Department Sales</div>
                <div className="card-sub-title">
                  Overall Sales Revenue and Profits Performance Online and
                  Offline for Q1 to Q4.
                </div>
              </div>
              <div className="card-body btm-bdr yellow pb-0">
                <div className="dpt-sales">
                  <div className="dpt-sales-header">
                    <span className="dpt-sales-number">6,000</span>
                    <i className="icon-trending_up text-success" />
                    <small>10.5%</small>
                  </div>
                  <div id="apexSales" className="blue-graph" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Customers</div>
                <div className="card-sub-title">
                  Overall Customers and Signups Performance Online and Offline
                  Sales Q1 to Q4.
                </div>
              </div>
              <div className="card-body btm-bdr sea-blue pb-0">
                <div className="customers">
                  <div className="customers-header">
                    <span className="customers-number">7,500</span>
                    <i className="icon-trending_up text-success" />
                    <small>12.5%</small>
                  </div>
                  <div id="customers" className="pink-graph" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row end */}
        {/* Row start */}
        <div className="row gutters">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className="notify info">
              <div className="notify-body">
                <span className="type">Info</span>
                <div className="notify-title">
                  Give your valuable feedback.
                  <img src={notification_info} alt="notification_info" />
                </div>
                <div className="notify-text">
                  How likely are you to recommend Retail Dashboard to your
                  friends?
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className="notify danger">
              <div className="notify-body">
                <span className="type">Danger</span>
                <div className="notify-title">
                  Give your valuable feedback.
                  <img src={notification_danger} alt="notification_danger" />
                </div>
                <div className="notify-text">
                  How likely are you to recommend Retail Dashboard to your
                  friends?
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className="notify success">
              <div className="notify-body">
                <span className="type">Success</span>
                <div className="notify-title">
                  Give your valuable feedback.
                  <img src={notification_success} alt="notification_success" />
                </div>
                <div className="notify-text">
                  How likely are you to recommend Retail Dashboard to your
                  friends?
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row end */}
      </div>
    </div>
  );
};

export default MainContainer;
