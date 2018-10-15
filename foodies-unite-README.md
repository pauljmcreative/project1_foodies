# Foodies Unite

*An app for travellers who love food and want quick and easy restaurant recommendations for their next trip*

[Link to project hosted on Heroku]()

## Technologies Used

* HTML
* CSS
* jQuery
* Fetch
* Zomato API
* MongoDB
* Mongoose
* Express



## Existing Features

* Search for a city to get a restaurant recommendation from Zomato
* Inspirational food photos 
* View additional restaurant recommendations
* View previous restaurnt recommendations
* View comments
* Add, edit, delete comments
* Custom logo



## Planned Features

* Allow users to log in to create a profile
* Add filter for cuisine types
* Match default photos to cuisine type when Zomato has no featured image for a restaurant
* Stretch goals: introduce google maps to give directions for each restaurant

---

## Wins
1. Pair programming
	* Very few syntax errors - these were easy to spot and call out when watching the other person code.
	* Good planning and communication of who was working on what and when to merge - resulted in minimal issues merging code to master from two separate branches with changes to the same files.
	* Dual ownership of project process and final product.
  * Communication is key.  we found that describing what we were working on in detail and adding detailed commit comments made a big difference in minimal conflicts.
  * We had one (our first) conflict issue that stopped us for about 2 hours.  We learned quickly how to navigate past commit instances, how to revert our branches and the master and how to re-merge properly.  Stressful but necessary.

2. Accomplished main goals of creating a simple app with inspiring imagery and simplifying restaurant recommendations.

3. Able to connect user profiles to comments incorporating two seperate schemas.

## Challenges
1. Pair programming
	* Difficult to work with differing approaches problem-solving.

2. Zomato API
	* Difficult to understand how to structure the requests.
	* A lot of nested data made it difficult to find exactly what we needed to retrieve.
  * Extremely poor documentation
  * Crashed on us once.

3. DRY code for restaurant carousel next/previous functionality - tried a few things that didn't work:
![code snippet for restaurant carousel](../public/images/code/next_prev.png)

4. Creating login and signup proved more of a challenge than we originally expected.  It's something we would like to revisit later but a week was not enough time to work through it.

5. Had trouble stopping comments carousel dynamically in order to make changes.  We needed to revisit our carousel and likely revamp code but dime did not allow.


## Featured code snippets
1. Used window.matchMedia() to incorporate small screen nav click-to and smooth scroll behavior with minimal code.
![code snippet for smooth scroll](../public/images/code/smooth_scroll.png)

2. Edit and delete still proves to be a complicated function but we were able to make it work.
![code snippet for edit delete](../public/images/code/edit-delete.png)

3. Creating a flexbox tent city was fun and had it's share of challenges as some aspects were competing with others.  Nesting properly was key.
![code snippet for flexbox css](../public/images/code/flexbox.png)

4. This one is bitter sweet because we were able to simplify our existing carousel into a logical function.  unfortunately we ran into a console error that time did not allow to be fixed.  Either way, it's much less code than our comments carousel and eventually (once working properly) it will not only replace the latter but also make it easier to pause the next image function when we want to edit.
![code snippet for new image carousel](../public/images/code/new-carousel.png)






