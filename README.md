
# USE-RESOLVER
  A React hook for managing asynchronous data fetching and state management.

## Installation

```bash

npm  install  use-resolver

```

## Usage

```javascript

import React from  'react';
import useResolver from  'use-resolver';

function  MyComponent() {
	const { state, mutate, revalidate } =  useResolver('myData', async function () {
		const response =  await  fetch('https://api.example.com/data');
		return response.json();
	});

	// Access resolved data and loading state:
	return (
		<div>
			{state.isLoading  ? (
				<p>Loading...</p>
			) : (
			<div>
				<p>Data: {JSON.stringify(state.data)}</p>
				<button  onClick={revalidate}>Revalidate</button>
			</div>
			)}
		</div>
	);
}

```

## Features

-  **Asynchronous data fetching:** Fetches data using a promise and manages loading, success, and error states.

-  **State management:** Stores fetched data and error information in a state object, accessible within your component.

-  **Automatic revalidation:** Re-fetches data when dependencies change (e.g., when props or other hooks update).

-  **Manual revalidation:** Offers a `revalidate` function to manually trigger re-fetching.

-  **Data mutation:** Allows you to directly modify the fetched data using the `mutate` function.

## Options

-  **`key` (string):** A unique identifier for the resolver.

-  **`promise` (function):** A function that returns a promise for the data to be fetched.

-  **`options` (object):** Optional configuration options:

-  **`onResolve` (function):** A callback function to be executed when data is successfully resolved.

-  **`onError` (function):** A callback function to be executed when an error occurs.

-  **`deps` (DependencyList):** An optional dependency list for automatic revalidation.

## Additional Information

-  **Subscriber:** The library utilizes a subscriber mechanism for managing state updates and subscriptions.

-  **ReturnResolver:** The `useResolver` hook returns a `ReturnResolver` object with:

	-  `state`: The state object containing `data`, `isLoading`, and `error` properties.

	-  `mutate`: A function to mutate the fetched data.

	-  `revalidate`: A function to manually trigger re-fetching.