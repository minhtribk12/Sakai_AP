# COURSE CLASS LIST
# Given: An user's id
# Target: Query all courses that the user joins
# Query: SELECT * FROM course_class cc LEFT JOIN course c ON cc.course_id = c.course_id WHERE cc.course_class_id IN (SELECT m.course_class_id FROM membership m WHERE m.users_id = <user_id>);
SELECT * FROM course_class cc LEFT JOIN course c ON cc.course_id = c.course_id WHERE cc.course_class_id IN (SELECT m.course_class_id FROM membership m WHERE m.users_id = 1);

# COURSE CLASS ROLE
# Given: A user's id, a course class's id
# Target: Query to verify if the user is member in that class and his/her role in this class
# Query: SELECT role FROM membership WHERE users_id = <user id> and course_class_id = <course class id>; 
SELECT role FROM membership WHERE users_id = 1 and course_class_id = 1; 


# ANNOUNCEMENT LIST
# Given: A course_class_id
# Target: Query all annoucements of that course class plus their authors
# Query: SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = <course class id>; 
SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = 1; 

	# ANNOUNCEMENT DETAIL
	# Given: An announcement's id
	# Target: Query the annoucement plus its author
	# Query: SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.announcement_id = <announcement id>; 
	SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.announcement_id = 1; 

	# ANNOUNCEMENT ATTACHMENTS
	# Given: An announcement's id
	# Target: Query all the attachments of that annoucement id
	# Query: SELECT * FROM attachment a LEFT JOIN announcement_attachment aa ON a.attachment_id = aa.attachment_id WHERE aa.announcement_id = <announcement id>; 
	SELECT * FROM attachment a LEFT JOIN announcement_attachment aa ON a.attachment_id = aa.attachment_id WHERE aa.announcement_id = 1;

	# CREATE AN ANNOUNCEMENT
	# Given: A course class's id, current user's id, title, content
	# Target: Create an announcement
	# Query: INSERT INTO announcement(course_class_id, users_id, title, content, date_created) VALUES(<course class id>, <author id>, <title>, <content>, now()); 
	INSERT INTO announcement(course_class_id, users_id, title, content, date_created) VALUES(1, 1, 'Annoucement test', 'test', now());

	# UPDATE AN ANNOUNCEMENT
	# Given: A announcement's id, title, content that need to be updated
	# Target: Update the announcement
	# Query: UPDATE announcement SET title = <new title>, content = <new content> WHERE announcement_id = <announcement id>;
	UPDATE announcement SET title = 'AP Announcement 1', content = 'abcd' WHERE announcement_id = 1;

	# DELETE AN ANNOUNCEMENT
	# Given: A announcement's id needing to be removed
	# Target: Delete the announcement
	# Query: DELETE FROM announcement WHERE announcement_id = <announcement id>;
	DELETE FROM announcement WHERE announcement_id = 1;

# DISCUSSION LIST
# Given: A course_class_id
# Target: Query all discussions of that course class plus their authors
# Query: SELECT * FROM discussion d LEFT JOIN users u ON d.users_id = u.users_id WHERE d.course_class_id = <course class id>; 
SELECT * FROM discussion d LEFT JOIN users u ON d.users_id = u.users_id WHERE d.course_class_id = 1; 

	# DISCUSSION DETAIL
	# Given: A discussion's id
	# Target: Query the discussion plus its author
	# Query: SELECT * FROM discussion d LEFT JOIN users u on u.users_id = d.users_id WHERE d.discussion_id = <discussion id>; 
	SELECT * FROM discussion d LEFT JOIN users u on u.users_id = d.users_id WHERE d.discussion_id = 1; 

	# COMMENT LIST
	# Given: An discussion's id
	# Target: Query all the comments of that discussion plus their authors
	# Query: SELECT * FROM message m LEFT JOIN discussion d ON d.discussion_id = m.discussion_id LEFT JOIN users u ON u.users_id = m.users_id WHERE m.discussion_id = <discussion id> ORDER BY m.date_created DESC;
	SELECT * FROM message m LEFT JOIN discussion d ON d.discussion_id = m.discussion_id LEFT JOIN users u ON u.users_id = m.users_id WHERE m.discussion_id = 1 ORDER BY m.date_created DESC;

# ASSIGNMENT LIST
# Given: A course_class_id
# Target: Query all assingments of that course class plus their authors
# Query: SELECT * FROM assignment a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = <course class id>; 
SELECT * FROM assingment a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = 1; 

	# ASSIGNMENT DETAIL
	# Given: An assignment's id
	# Target: Query the assignment plus its author
	# Query: SELECT * FROM assignment a LEFT JOIN users u on u.users_id = a.users_id WHERE a.assignment_id = <assignment id>; 
	SELECT * FROM assignment a LEFT JOIN users u on u.users_id = a.users_id WHERE a.assignment_id = 1; 

	# ASSIGNMENT ATTACHMENTS
	# Given: An assignment's id
	# Target: Query all the attachments of that annoucement id
	# Query: SELECT * FROM attachment a LEFT JOIN assignment_attachment aa ON a.attachment_id = aa.attachment_id WHERE aa.assignment_id = <assignment id>; 
	SELECT * FROM attachment a LEFT JOIN assignment_attachment aa ON a.attachment_id = aa.attachment_id WHERE aa.assignment_id = 1;	

	# ASSIGNMENT SUBMISSION 
	# Given: An assignment's id and an user's id
	# Target: Query the submission corresponding to the assignment and the user
	# Query: SELECT * FROM submission s LEFT JOIN assignment a ON s.assignment_id = a.assignment_id WHERE a.assignment_id = <assignment id> AND s.users_id = <user id>; 
	SELECT * FROM submission s LEFT JOIN assignment a ON s.assignment_id = a.assignment_id WHERE a.assignment_id = 1 AND s.users_id = 1;

	# SUBMISSION ATTACHMENTS 
	# Given: An submission's id
	# Target: Query the submission's attachments
	# Query: SELECT * FROM attachment a LEFT JOIN submission_attachment sa ON a.attachment_id = sa.attachment_id WHERE sa.submission_id = <submission id>;
	SELECT * FROM attachment a LEFT JOIN submission_attachment sa ON a.attachment_id = sa.attachment_id WHERE sa.submission_id = 1;

# GRADEBOOK LIST FOR STUDENT
# Given: A course_class_id and a student's id
# Target: Query all gradebook of that course class and student
# Query: SELECT * FROM gradebook g WHERE g.users_id = <student id> AND g.course_class_id = <course class id>; 
SELECT * FROM gradebook g WHERE g.users_id = 1 AND g.course_class_id = 1;

# GRADEBOOK LIST FOR TEACHER
# Given: A course_class_id
# Target: Query all gradebook of that course class
# Query: SELECT * FROM gradebook g WHERE g.users_id = <student id> AND g.course_class_id = <course class id>; 
//TODO

