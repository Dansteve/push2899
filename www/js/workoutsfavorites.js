'use strict';
app
.service('WorkoutsService',['_', function(_){

	var id_usuario = localStorage.getItem("id_auth");
	var workoutsFavorites = (window.localStorage.workoutsFavorites)? JSON.parse(window.localStorage.workoutsFavorites) : [];
	function _favorite() {
		var arg = arguments[0];

		if(typeof arg === 'number'){ 
			workoutsFavorites = _.without(workoutsFavorites, _.findWhere(workoutsFavorites, {id: arg}));
		}

		if(typeof arg === 'object'){
			var existingPost = _.find(workoutsFavorites, function(post){ return post.id === arg.id; });

			if (!existingPost) {
				workoutsFavorites.push({
					id: arg.id,
					title : arg.workout_title,
					image : arg.workout_image,
					goal : arg.goal_title,
					level : arg.level_title,
					duration : arg.workout_duration,
					user: id_usuario,
				});
			}			
		}

		localStorage.workoutsFavorites = JSON.stringify(workoutsFavorites);
		return workoutsFavorites;
	}

	return{
		favorite: _favorite
		
	};

}]);
