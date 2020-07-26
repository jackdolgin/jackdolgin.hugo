---
title: Michael Scott Does(n’t do) Dimensionality Reduction
date: 2020-07-22
tags: ["explainer", "pca", "neuromatch"]
draft: true
summary: This post is going to walk through tutorials 1-3 on week 2, day 1 of Neuromatch Academy.
---

{{% figure src="/files/this-is-pretzel-day.jpg" alt="Pretzel Day" attr="Fair use" %}}



Pretzel Day. It’s the most important day of the year for Dunder Mifflin employee Stanley Hudson. But if you have never seen the show The Office, I’m referencing this clip. Michael asks what toppings he can get with his pretzel, and the vendor tells him 18 kinds.

<br>{{< youtube id="FldGxkUFuuQ?start=144" >}}<br>

Ultimately, Michael eats a pretzel that has all 18 toppings, he gets an energy rush, and then he has a food coma nap. Today’s question—how can someone in Michael’s shoes get the lovely taste that came with that pretzel without having to accumulate so much sugar? In other words, and yes this might be a stretch, how can we do dimensionality reduction?

The gist behind dimensionality reduction is that there are sort of diminishing marginal returns on the accumulation of certain variables. Would Micael Scott have really noticed if say only half of the toppings were added to his pretzel? The extra toppings take a toll on his energy (and tummy), and does their addition to the pretzel really warrant them?

There’s a few reasons we might want to do dimensionality reduction in science. Mostly it comes down to not wanting to work with such large data. A bunch of extra columns in a massive data set might slow down your work a lot, or even overload your system, or they just might be undesirable because they’re hard to visualize

Our task: can we aggregate these 18 different flavors into a few general themes, so that Michael can get a dose of sugar, tart, and filling without needing to down so much junk? After all, Pam tells Michael that expense reports are due by the end of the day, and Michael doesn’t need another excuse to procrastinate in the form of a nap.

<br>
***

Below is our data frame. We’re saying that each of the 18 rows corresponds to one of the toppings, and each of the 10 columns corresponds to one of the tastes that I’ve determined together are necessary for Michael to feel content with his pretzel. Then, each cell is some predetermined rating of how much each of the toppings contributes to that food taste, using some arbitrary unit and as determined scientifically using a carefully conducted sample run on the members of Dunder Mifflin (except Meredith, [since she’s allergic to dairy](https://www.youtube.com/watch?v=7lmQuD385kI)).

{{< bootstrap-table "table table-hover table-responsive table-wrapper-scroll-y my-custom-scrollbar" >}}
| Topping               | TBD |
|-----------------------|-----|
| Sweet glaze           | TBD |
| Cinnamon sugar        | TBD |
| Chocolate             | TBD |
| White chocolate       | TBD |
| Fudge                 | TBD |
| M&M's                 | TBD |
| Caramel dip           | TBD |
| Mint chip             | TBD |
| Chocolate chip        | TBD |
| Marshmallow           | TBD |
| Nuts                  | TBD |
| Toffee nuts           | TBD |
| Coconut               | TBD |
| Peanut butter drizzle | TBD |
| Oreos                 | TBD |
| Sprinkles             | TBD |
| Cotton candy bits     | TBD |
| Powdered sugar        | TBD |
{{< /bootstrap-table >}}
