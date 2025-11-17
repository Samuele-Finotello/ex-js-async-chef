async function fetchJson(url) {
  const response = await fetch(url);
  const object = await response.json();
  return object;
}

async function getChefBirthday(id) {
  let recipe;

  try {
    recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`)
  } catch (error) {
    throw new Error(`Non posso recuperare la ricetta con id ${id}`)
  }

  if (recipe.message) {
    throw new Error(recipe.message)
  }

  const userId = recipe.userId;

  let chef;

  try {
    chef = await fetchJson(`https://dummyjson.com/users/${userId}`)
  } catch (error) {
    throw new Error(`Non posso recuperare lo chef con id ${userId}`)
  }

  if (chef.message) {
    throw new Error(chef.message)
  }

  return chef.birthDate;
}

(async () => {
  try {
    const chefBirthday = await getChefBirthday(4);
    console.log('Data di nascita dello chef: ', chefBirthday)
  } catch (error) {
    console.error(error)
  }
})();