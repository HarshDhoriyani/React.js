## Introduction

React Fiber is an ongoing reimplementation of React's core algorithm. It is the culmination of over two years of research by the React team.

The goal of React Fiber is to increase its sustainability for areas like animation, layout and gestures. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.

Other key features include the ability to pause, abort, or reuse work as new updates come in; the ability to assign priority to different types of updates; and new concurrency primitives.

### What is reconciliation?

<dl>
    <dt>reconciliation</dt>
    <dd>The algorithm React uses to differentiate one tree with another to determine which parts need to be changed.</dd>

    <dt>update</dt>
    <dd>A change in the data used to render a React app. Usually the result of 'setState'. Eventually results in a re-render.<dd>
</dl>

The central idea of React's API is to think of updates as if they cause the entire app to re-render. This allows the developer to reason declaratively, rather than worry about how to efficiently transition the app from any particular state to another (A to B, B to C, C to A, and so on).

Actually re-rendering the entire app on each change only works for the most trivial apps; in a real-world app, it's prohibitively costly in terms of performance. React has optimizations which create the appearance of whole app re-rendering while maintaining great performance. The bulk of these optimizations are part of a process called reconciliation.

Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM". A high-level decsription goes something like this: when you render a React application, a tree of nodes that describes the app is generated and saved in memory. This tree is then flushed to the rendering environment - for example, in the case of a browser application, it's translated to a set of DOM operations. When the app is updated (usually via `setState`), a new tree is generated. The new tree is diffed with the previous tree to compute which operations are needed to update the rendered app.

The key points are: 
- Different component types are assumed to generate substantially different trees. React will not attempt to differentiate them, but rather replace the old tree completely.

- Diffing of lists is performed using keys. Keys should be "stable, predictable, and unique."

- In a UI, it;s not necessary for every update to be applied immediately; in fact, doing so can be wasteful, causing frames to drop and degrading the user experience.

- Different types of updates have different priorities -- an animation update needs to complete more quickly than, say, an update from a data store.

- A push-based approach requires the app to decide how to schedule worl. A pull-based approach allows the framework (React) to be smart and make those decisions for you.