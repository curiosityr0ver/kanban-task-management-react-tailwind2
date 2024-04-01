import React, { useState } from "react";
import RightArrow from "../assets/25283.png";
const Project = ({
	projects = [
		{
			title: "Team A",
			description: "This is Team A, responsible for project A development.",
			members: [
				"member1@example.com",
				"member2@example.com",
				"member3@example.com",
			],
		},
		{
			title: "Team B",
			description: "Team B handles backend services for project B.",
			members: ["member4@example.com", "member5@example.com"],
		},
	],
}) => {
	return (
		<div className="p-5">
			{projects.map((project, index) => (
				<div
					key={index}
					className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"
				>
					<div className="md:flex">
						<div className="p-8 w-full">
							<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
								{project.title}
							</div>
							<p className="mt-2 w-full text-gray-500">{project.description}</p>
							<div className="mt-2 text-gray-500">Members:</div>
							<ul className="list-disc list-inside">
								{project.members.map((member, index) => (
									<li key={index}>{member}</li>
								))}
							</ul>
						</div>
						<div className="flex justify-center items-center">
							<img
								className="h-24 w-16 object-fill md:w-48"
								src={RightArrow}
								alt="Project image"
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Project;
