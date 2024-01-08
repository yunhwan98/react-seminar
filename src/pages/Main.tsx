import React, { useEffect, useState } from 'react';
import { parsing } from '../utils/crawl';

interface Course {
	title: string;
	instructor: string;
	price: string;
	img: string;
	rating: string;
}

interface NomadCourse {
	title: string;
	content: string;
	img: string;
}

function Main() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [nomads, setNomads] = useState<NomadCourse[]>([]);

	useEffect(() => {
		async function getData() {
			let inflearn_data = await parsing('프론트엔드', 'inflearn');
			let fastcampus_data = await parsing('react', 'fastcampus');
			await parsing('프론트엔드', 'codeit');
			let nomad_data = await parsing('fe', 'nomad');

			await parsing('리액트', 'goorm');
			setCourses(inflearn_data);
			setNomads(nomad_data);
		}
		getData();
	}, []);
	console.log(nomads);
	return (
		<div>
			<h1>Main</h1>
			{/* {courses &&
				courses.map((course, idx) => (
					<div key={idx}>
						<div>{course.title}</div>
						<div>{course.instructor}</div>
						<div>{course.price}</div>
						<img alt='course_img' src={course!.img} />
					</div>
				))} */}

			{nomads.map((course, idx) => (
				<div key={idx}>
					<div>{course.title}</div>
					<div>{course.content}</div>
					<img alt='course_img' src={course!.img} />
				</div>
			))}
		</div>
	);
}

export default Main;
