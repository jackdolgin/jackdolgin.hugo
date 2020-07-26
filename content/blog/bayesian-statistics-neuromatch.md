---
title: Recapping Bayesian Statistics walkthrough from Neuromatch Academy
date: 2020-07-26
tags: ["explainer", "bayesian", "statistics", "neuromatch"]
draft: false
summary: This post is going to walk through tutorials 1-3 on week 2, day 1 of Neuromatch Academy.
---

This post is going to walk through tutorials 1-3 on [week 2, day 1](https://github.com/NeuromatchAcademy/course-content/tree/master/tutorials/W2D1_BayesianStatistics) of [Neuromatch Academy](https://neuromatch.io/academy/). I’m hoping to eventually add summaries of the tutorials for some of the other days too. Special thanks to TA's [Dana Glenn](https://twitter.com/dana_e_glenn), [Kevin O’Neill](https://kevingoneill.github.io/), and [Shawn Rhoads](https://shawnrhoads.github.io/) and ([and the rest of my pod](https://twitter.com/ShawnRhoads56/status/1284260656217235462)) and fellow student [Maria Khoudary](https://twitter.com/maria_khoudary) for walking me through many of these examples.
***
<br>
## Bayesian background

It’s worth beginning by revisiting Bayes' theorem. [This link](https://setosa.io/conditional/) gives an incredible explanation of it, and you can think of the formula as saying, “If we zoom in on the domain space *B*, what’s the probability of also landing on *A* inside that domain space?” And it’s sort of simple, because all we’re describing is the overlap of *B* and *A* like a Venn diagram, which is equal to *P(A ∩ B)*, which then gets divided by *P(B)* because we’re asking, “Out of all the *B* space, what’s the chance of *A*?” and if there were an *A* value for every *B* value, *A* / *B* = *B* / *B* = 1.

And then *P(A ∩ B)* can be further broken down into *P(A)* · *P(B | A)*, since we’re saying, “First of all what’s the chance that we even land on *A* out of the whole domain space,” and this is a prior. It’s like asking, “Of all the desserts I eat, which has chocolate in it?”—we’re focusing just on desserts and not other meals, so *P(A)* is like saying, *P(desserts)*. And then *P(B | A)* is like saying, “Since we’re working with only desserts, let’s find the probability of chocolate.” We call this conditional probability, or the likelihood, because we’re taking *P(B)* assuming we’re working with assumption *A*, but assumption *A* isn’t a given, it’s conditional. So *(B | A)* requires both *B* being true and *A* being true.

$$
P(A|B) = \dfrac{P(B|A) \cdot P(A)}{P(B)}
$$

Ok, so what does that formula have to do with the behavior in the example? Because that behavior is basically an integration of two pieces of information—instead of taking into account both where the red and blue bars overlap to find *A* given *B*, we account for both how likely it is that an image appeared in a given location (our prior), and how likely the audio actually comes from where we thought we heard it come from. We’ll get more into this in a moment, but first let’s review the task for [tutorial 1](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial1.ipynb) (which note is different than the task for the other tutorials!)

<br>
## Tutorial 1

So you see an image, you hear a sound, and you have to determine where the sound came from, with the understanding that the image location may have some bearing on where the sound came from. We have that understanding because throughout our lives, we’ve come to expect a sound to come from the same place as an object if both just suddenly occur at the same time.

Now we can start plugging into the Bayes equation (or dare I say, equayesian; ok I’ll stop (maybe)). So *P(A)*, our prior, is the contribution of where the visual stimulus occurred to our final guesstimate of where we think the audio occurred. Let’s say we’re positive we saw the visual stimulus at *x* = *3*. And let’s say in general we’re pretty sure that where there’s a visual stimulus there’s sound. In fact, let’s say we’re certain. Then *P(B | A)* is going to add no new information. We already know where the image was, and we’re assuming that must be where the sound is. And so we respond by saying the sound occurred where the image did. And we keep doing this for a few trials, receiving feedback after each trial.

And then suddenly we’re told our response was incorrect.

In fact, we wind up completing 30 trials and saying the sound is exactly where the image was, and that strategy only leads us to the correct answer, say, 75% of the time. What we’re realizing is that the prior isn’t enough information to be correct. In other words, there’s uncertainty about the sound location even though we know where the image was. So we adapt.

We start changing our strategy, integrating more than just the prior (where the image appeared). Let’s model this (integration of) uncertainty. Say the visual stimulus appears at *x* = *-1*. We’re now going to create a distribution to represent the likelihood that indeed the sound also occurred at *-1*. So we create a Gaussian distribution (aka a normal distribution) with the mean indeed at *-1*, but the standard distribution (representing our uncertainty) spread over a few *x* values, see below.

{{% figure src="/files/Neuromatch_W2D1_Tutorial1_1.png" alt="Visual Gaussian" attr="[Underlying code](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial1.ipynb#scrollTo=HkkvOPUN297D)" %}}

Then we also incorporate the additional piece of information, where we thought we heard the sound come from. This piece of information also conveys uncertainty, though, since (whereas we’re assuming that if we saw a stimulus somewhere, we’re 100% certain the stimulus in fact occurred there), we’re not so great at detecting where the sound comes from (if we were great, we wouldn’t even need to rely on the prior).

So we’re going to represent our uncertainty about the sound as a Gaussian distribution, too. Say we heard the sound at *x* = *3*, then the mean of the distribution, *μ*, rests at *3*, and we’ll spread the standard deviation over a few values too.

{{% figure src="/files/Neuromatch_W2D1_Tutorial1_2.png" alt="Posterior Gaussian" attr="[Underlying code](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial1.ipynb#scrollTo=yjknQx1EyaSo)" %}}

Ok, so now we’ve established that our guess of the sound location is some happy medium between where the image occurred (because that prior is quite meaningful on its own) and where the sound occurred. Then, we do a bunch of trials, and basically we see and learn about how accurately the image and guessed sound predict the true sound’s location. If it turns out the image location hardly predicts true sound location, there will be a large variance between image location and true sound location, and we’ll choose to use more reliable information, i.e. where we thought the sound came from. Conversely, if there’s hardly any relationship between where we thought the sound occurred and where it turns out the sound occurred (learned via trial feedback), we’ll choose to rely more on the image’s position to make our choice. And if both the image location and perceived sound location are unpredictable, well that sucks haha.

This compromise between prior and likelihood gets represented in the following equation. Basically, the Gaussian distributions for image location and perceived sound location combine to form a new Gaussian, which is a like a weighted sum of the mean and standard deviation for both the prior and likelihood.

$$
<!-- \mu_{posterior} = \dfrac{\dfrac{\mu_{B}}{\sigma_{B}^2} + \dfrac{\mu_{A}}{\sigma_{A}^2}}{1/\sigma_{B}^2 + 1/\sigma_{A}^2} -->
$$
<figcaption>[Further explanation](https://www.youtube.com/watch?v=AbXorOLBrws)</figcaption>

<br>
***
Ok, before we move on to tutorial 2, just worth mentioning that I learned the other day that there are MRI scanners for mice! [Look at how cute this thing is](https://radiology.ucsf.edu/research/core-services/preclinical_MRI_MRS_core/3T_Bruker_MRI)

Anyways…

<br>
## Tutorial 2

[Tutorial 2](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial2.ipynb) is quite similar to tutorial 1! The only thing we’re going to change is one of our assumptions about our priors. Recall we assumed the prior indicated the correct location if one took some variance into account, and perhaps ignoring where the sound came from and focusing only the prior might have yielded a 75% accuracy. In tutorial 2, we keep the prior’s accuracy at 75%, except this 75% takes on a different distribution. Specifically, the prior goes from representing a single distribution to in experiment 2 representing the combination of two different Gausssian distributions. Tutorial 2 assumes that 75% of the time, our prior is always correct and, because it’s so consistently accurate, should take up a negligible standard deviation. In contrast, 25% of the time the image location says almost nothing about the sound’s true location, in which case there is tremendous variability between perceived and true sound location, yielding a massive standard deviation.

Of course, it would be great if we knew at the time whether a given trial’s location was or wasn’t meaningful. But [as a 76ers fan](../reinforcement-learning-introduction-basketball), I know that life’s not fair. So each trial we have to take an amalgamation of the 75% of trials’ and 25% of trial trials’ distributions. They combine to form, you guessed it, another Gaussian, called a “Gaussian Mixture.” This Gaussian Mixture, representing the prior, then combines with the Gaussian for likelihood to form, you guessed it again, another prior, just like in tutorial 1, representing the posterior.

{{% figure src="/files/Neuromatch_W2D1_Tutorial2.png" alt="Gaussian Mixture" attr="[Underlying code](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial2.ipynb#scrollTo=dqKKm5dpQ07Y)" %}}

<br>
## Tutorial 3
Finally, we reach [tutorial 3](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial3.ipynb) (there’s also a [tutorial 4](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial4.ipynb), but since most groups did not reach it I’m going to skip it here). When I first ~~did~~ tried to do tutorial 3 I thought it was the most difficult of the three, but upon understanding it I actually think it’s the most straightforward. I just think some of the wording and graph axes are confusing.

Tutorial 3 sets up an experiment just like tutorial 2, except instead of a 75/25 split for the prior it’s 95/5, which means the Gaussian Mixture is almost the same as having no distribution whatsoever. The standard deviation is so small for the prior that the prior is going to be extraordinarily influential in the final choice.

Specifically, in [3.2](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial3.ipynb#scrollTo=sDMSpJaCKTnI) the prior pretty much assumes that, except for a tiny amount of variance (which is hard to see anyways cause of the dark coloring), the sound location will be at point *0*, the location for 95% of trials. Whether it’s going to be influential or not, we can also calculate the Gaussian curve for the likelihood function ([3.1](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial3.ipynb#scrollTo=9yKMR1F4IMLi)), and sure enough wherever the sound happens to occur (the x axis, with all values other than *0* occurring during the 5% minority trials) our likelihood model homes in on a similar location, though with some variance like in tutorials 1 in 2, in blue.

That leaves the question of who will "win out" between prior and likelihood. Although I alluded to prior being particularly influential in this case, the likelihood still holds it own. When the sound actually occurs far away from *x* = *0*, the likelihood predicts a location far away from *0*, too, but this prediction is quite smeared out by the competing prior. In contrast, at around *x* = *0*, the prior and likelihood essentially reinforce each other, with both pointing to the sound coming from around *0*. That’s why posterior is so much brighter in the middle of the graph, the vertical part, than toward the sides.

{{% figure src="/files/Neuromatch_W2D1_Tutorial3_1.png" alt="Gaussian Mixture" attr="[Underlying code](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial3.ipynb#scrollTo=8-3Dgk8E8jSc&line=18&uniqifier=1)" %}}

I’d say the novel feature of tutorial 3 is this following part. One of the ideas in Bayesian modeling is that we sort of compare human behavior to a why model (see this footnote for an explanation of what, why, and how models[^1]). Performing optimally, a human who’s collected data in the way we’ve described and has reached such a posterior should then, of course, respond accordingly. In this case, given the sound  actually occurred at some x value, they would respond with the position whose y-axis value is brightest at that x value. They sort of do this in [section 3.4](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial3.ipynb#scrollTo=gszDV5ULkxCW), but if the sound had actually occurred at *x* = *2*, then optimal behavior given the posterior would be like stripping down the heat map just to the vertical line *x* = *2*, and then checking which value, in this example ~ *2*, was the mean of the posterior’s Gaussian.

The last part of the tutorial, though, forces us to reconsider whether people behave "optimally" given the posterior they’ve arrived at. In fact, we’re then supposed to assume that we need to multiply the posterior Gaussian (which as a reminder, is a combination of the likelihood Gaussian and the prior Gaussian, which in turn is a combination of the 95% and 5% Gaussians) by a Gaussian of how people actually make sense of the posterior. We think sometimes there’s a mismatch between posterior and choice because people, well, make mistakes and lose focus and have limited executive processes, etc (no, definitely not writing a thesis about that, no way, definitely not...).

{{% figure src="/files/Neuromatch_W2D1_Tutorial3_2.png" alt="Selection Gaussian" attr="[Underlying code](https://colab.research.google.com/github/NeuromatchAcademy/course-content/blob/master/tutorials/W2D1_BayesianStatistics/student/W2D1_Tutorial3.ipynb#scrollTo=aGWtvJEMLeSp)" %}}

<br><br>
[^1]: Dana and I walked through a hypothetical that I thought nicely boiled down [what vs. how vs. why models](https://github.com/NeuromatchAcademy/course-content/tree/master/tutorials/W1D1_ModelTypes). These three models, by the way, are three general frameworks for contextualizing any type of computational model. Fun fact, by the way, I only learned [last week](https://github.com/NeuromatchAcademy/course-content/tree/master/tutorials/W1D2_ModelingPractice) that modeling is basically like writing a function and then seeing how well that function and its parameters that you’ve chosen characterize the data).<br><br>Let’s say we want to study ice cream eating habits. A what question might be, "What do the eating patterns of people look like over the year?" Such a question might lead us to notice that people in the Northern Hemisphere eat more ice cream during July than January (can’t say the cold slows me down, though). The next question might be, "Why do people eat more ice cream during July than January?" to which we might build a model demonstrating that people prefer a cold food like ice cream as a way of cooling down, which is more likely to be necessary during the a warm month like July than a cold month like January. Finally, we might want to know "How," specifically, "How does the cold ice cream cool you down?" which might prompt a model for how the consumption of ice cream slowly affects maybe your hypothalamus responsible for homeostasis, and that in turn triggers an internal cool down that counteracts all the heat your skin is bringing in (don’t quote me at all on this, I don’t know what I’m talking about).
