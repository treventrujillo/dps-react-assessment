Initialized Commit: 9/29/17 11:00 A.M.

Began Project: 9/30/17: 11:00 A.M.

Committed Beer Component: 5:24 P.M.
  I played around a lot with the console after struggling with defining 'this' inside my class component.
  When I figured out why it wasn't working I fixed the issue and started to play around with what data from
  the beer array I should display and how it would be styled. I actually learned a lot and a few concepts clicked
  after digging through the React console. Although it took me a couple of hours to complete the component, I learned
  where to look if things aren't working correctly and how to fix those issues. I feel a lot more confident in my understanding
  of React components and their lifecycle methods.

Breaked at 5:30 P.M.

Resumed at 8:00 P.M.

Committed Brewery Component: 12:30 P.M.
  Again I've been playing around with the console and really digging around the react console and 
  messing with the data results from the server api. I'm having an issue where I can not return key 
  values inside objects inside an object. I can return the first level values of an object but not the 
  values inside objects in the object. Example:
    return breweries.map( brewery => {
      <h1>brewery.name</h1> // returns name successfully
      <h1>brewery.name.images.medium</h1> // error: cannot read property 'medium' of undefined
    })
  For some reason in my Beers component I was able to return a nested key value on one certain key value pair,
  every other nested key value was returning the same error. Example:
      return beers.map( beer => {
        <h1>beer.name</h1> // returns name successfully
        <h1>beer.style.category.name</h1> // returns beer style category's name successfully
        <h1>beer.glass.name</h1> // error: cannot read property 'name' of undefined
      })
  This has been confusing me for a couple hours and I've been searching google trying to find a solution to this 
  problem. I've played around the console and I can get it to return in the console, but not inside the render method.
  So I'm guessing there is something asynchronous about the state when it's being rendered. I played around with the componentDidMount()
  function and with setting state but I couldn't figure it out. I can set the axios get response to the component's state, so this isn't completely impeding on my progress with the assessment's objectives but it's still something that I want to figure out. 
  This is taking me a while to complete because I am trying to learn concepts, such as rendering nested values above, and I'm spending most of my time googling and playing with the React console. The concepts of setting state to components, filling the state with data from a server request or local database, and rendering out that data are concrete in my mind. I thought I understood lifecycle methods better but dealing with asynchronous data, if that is the problem, made me realize that I need to read up on them more. 

Breaked at 12:30 P.M.

Resumed 1:30 A.M.

Committed Redux Thunk: 2:30 A.M.