'use strict';
app
.service('RecipesService',['_', function(_){

	var id_usuario = localStorage.getItem("id_auth");
	var dietsFavorites = (window.localStorage.dietsFavorites)? JSON.parse(window.localStorage.dietsFavorites) : [];
	function _favorite() {
		var arg = arguments[0];

		if(typeof arg === 'number'){ 
			dietsFavorites = _.without(dietsFavorites, _.findWhere(dietsFavorites, {id: arg}));
		}

		if(typeof arg === 'object'){
			var existingPost = _.find(dietsFavorites, function(post){ return post.id === arg.id; });

			if (!existingPost) {
				dietsFavorites.push({
					id: arg.id,
					title : arg.diet_title,
					image : arg.diet_image,
					category : arg.category_title,
					calories : arg.diet_calories,
					user: id_usuario,
				});
			}			
		}

		localStorage.dietsFavorites = JSON.stringify(dietsFavorites);
		return dietsFavorites;
	}

	return{
		favorite: _favorite
		
	};

}]);
