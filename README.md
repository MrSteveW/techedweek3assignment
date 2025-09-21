## :dart: Requirements achieved

- [x] My game fetches the API data for upgrades :+1:
- [x] I have tried to use efficient functions throughout - eg saveState() and displayState() are called in other functions. To buy an upgrade, I passed in the upgradeId to then pass that in to updateStock function. :ok_hand:
- [x] I did have help from Sam with the concept that I can add an event listener to the Buy/Learn button whilst it is being created in the initial loop - that's something new I've learned! :neckbeard:
- [x] I used setInterval function to add the neurons per second (stored in state) to the neuronCount and then save to localStorage :clock11:
- [x] I used a state object to contain all the state data and the function saveState saves this data to Local Storage :grin:

## :dart: Stretch goals

- [x] Added a README for play info. Not sure what goes in one of those: I could either read the READMEs for more computer games. Or play the games!!
- [x] My upgrade function cleverly uses parameters so it is more generic and covers all upgrades... even future ones if we decide to edit the data the API refers to use
- [x] I found the way to animate the 'brain' image with a little jump to add to the UX. I didn't realise it would be in CSS, not in JavaScript... **transform: translateX(5px) translateY(-10px);** :bulb:
- [x] I wrapped the fetching of the API data in a try/catch statement so that if the API is not available, the whole app does not crash. :nut_and_bolt:
- [x] I also mapped my own upgrade names, that were more in keeping with the 'growth mindset' styling :clap:
- [x] I added a sound toggle, which turns on/off the two sound effects - clicking the brain and buying an upgrade. It seems silly that I have to individually include every sound and not just have a way of coding 'all sounds off'... if I want to add another sound, I would have to remember to include it in the 'Sound off' part of JavaScript... what if I have 1000s of sounds!! :mute: :thinking:
- [x] I was fed up of seeing the error of favicon not found... so I made one to see what all the fuss is about. I hear that some devs make 21 different icons?!
- [x] I am keen to get into good habits of accessibility built-in instead of added-on. I added **alt** label to the image as clicking this is key to playing the game. I turned **off** reading out every aspect of the upgrades, as it was too much info!! I also wanted to give an **aria-label** to each 'Learn' button. As these were created in a Javascript forEach loop... it was a nightmare! I did get some _artificial_ help in creating a screen reader description that adds to a "visually-hidden" span that can be added to aria-describy. That was a nightmare!! :unamused:

## :pushpin: Unable to achieve

- [ ] I would have liked to tidy up the creation of each of the divs for the upgrade elements, I can see a lot of repeat code and I don't like that. I'm sure there's a nested loop solution in there... I just ran out of time! :thinking:
