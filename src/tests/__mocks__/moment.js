const moment = jest.requireActual("moment");
export default (timestamp = 0) => {
  return moment(timestamp);
};

/*This function defined above will mock the moment library in our test files, i.e.
this function will be imported instead of moment in our test files. 
This lets us prevent discrepencies like the time not matching in the snapshot when tests
were run because moment() was called and it returned the present time, which obviously 
wont match the time at which snapshot was created. */
