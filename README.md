# TheExpanseRPG
In order to use this custom character sheets you must have a PRO account
with Roll20. You will need access to custom Character Sheets as well as
Custom API's.

# Basic usage
Create a character and enter Bio & Info as desired, then switch to character
sheet and set your name and level. Fill out the rest of the required data for
your character and set the abilities and base income. Then proceed with adding
talents and specialisations.

- Abilities have a `die roll` button on the left, with focuses having
a dedicated button. All rolls are automatic and are shown in the chat window.

- Any focus bonuses (and improved focuses at level 11 and beyond) are
automatically added into their Focus rolls

- Talents and Specializations have all their info copied from the Game Manual
PDF and usage restrictions for selecting them are built in. E.g. the Burglary
Talent requires Dexterity 2 or higher, so if you don't have Dexterity >= 2 you
cannot select Burglary as a Talent.

- Anytime a talent or specialization rank increases, it will permanently modify
a Focus' bonus, all the rolls then use automatically calculated bonuses.
E.g. The Hacker Specialization's Novice rank gives a +1 to ALL
Intelligence(Technology) tests, so that bonus will already be applied.

- If the Focus' bonus applies only in some scenarios then you must make
sure you add it manually when prompted for Additional Modifiers during the
roll. E.g. The Command Talent's Expert rank gives all NPC allies a +1 bonus
to their initiative rolls which must be applied manually.

- I tried to explicitly point out any time a bonus applies automatically,
but if you're not sure, try the roll both with and without the Talent,
Specialization, or applied rank to see if the `Modifiers` number changes
in the roll. Sorry if I missed some :/.

- It's extremely likely I made some typos, mistakes, or mis-copied some
data. I found a couple just writing this README. If you encounter an issue
feel free to try to fix it on your own or submit a Pull Request to have it
fixed in this repo. If it's more serious than that, or you don't know how to
do those things submit an issue, and I'll try, and address it as soon as I can.

# Installation
## Installing the character sheet
1) Create a new campaign
1) Go to Settings > Game Settings
1) Under **Character Sheet Template** select `Custom`
1) Copy the code from `lib/Character Sheet.html` in this project to the HTML Layout tab on your Roll20 campaign's settings page
1) Copy the code from `lib/Character Sheet.css` in this project to the CSS Styling tab on your Roll20 campaign's settings page
1) Press `Save` at the bottom of the page before moving on.

## Installing TheExpanseAPI
1) From your campaign's main page go to Settings >  API Scripts
1) Select `New Script`
1) Copy the code from `lib/TheExpanseAPI.js` into the code window shown
1) (optional) Rename the file from untitled.js to TheExpanseAPI.js
1) Press `Save Script` and ensure that the console window at the bottom starts talking about restarting the sandbox and spinning up a new one

Once all the above steps are complete, you're done! You should be able to create a new character in your Launched game.

# TODO
1) Test and test and test.
 