use chat;
-- create table users (
-- 	id int primary key auto_increment,
--     email varchar(50) unique not null,
--     password varchar(255) not null,
--     phone varchar(15) unique not null ,
--     fullName varchar(50) not null,
--     avatar varchar(255),
--     is_online boolean default false,
--     last_active datetime,
--     create_at datetime default (current_timestamp)
-- );

-- alter table users change is_online isOnline boolean default false;
-- alter table users change last_active lastActive datetime;
-- alter table users change create_at createdAt datetime default (current_timestamp);
-- desc users;

-- create table friends (
--     userId int not null,
--     friendId int not null,
-- 	status enum('pending, accepted, block'),
--     createAt datethttps://file+.vscode-resource.vscode-cdn.net/d%3A/tung/Web/chat_project_mysql/Database%20design/Untitled%20%281%29.png?version%3D1744989815261ime default (current_timestamp),
--     acceptedAt datetime,
--     primary key (userId, friendId),
--     foreign key (userId) references users(id),
--     foreign key (friendId) references users(id)
-- );

-- create table conversations(
-- 	id int primary key auto_increment,
--     name varchar(50),
--     isGroup boolean,
--     createdAt datetime default (current_timestamp)
-- );

-- show create table friends;

-- create table conversation_members(
-- 	conversationId int not null,
--     userId int not null,
--     joinedAt datetime default(current_timestamp),
--     role enum('admin', 'subadmin', 'member'),
--     foreign key (conversationId) references conversations(id),
--     foreign key (userId) references users(id)
-- );

-- alter table conversation_members
-- add primary key (conversationId, userId);

-- desc conversation_members;
-- show create table conversation_members;

-- create table messages(
-- 	id int primary key auto_increment,
--     conversationId int not null,
--     senderId int not null,
-- 	content text not null,
--     fileUrl varchar(255),
--     createdAt datetime default (current_timestamp),
--     foreign key (conversationId) references conversations(id),
--     foreign key (senderId) references users(id)
-- );

-- create table message_status(
-- 	messageId int not null,
--     userId int not null,
--     isRead boolean default false,
--     readedAt datetime,
--     foreign key (messageId) references messages(id),
--     foreign key (userId) references users(id)
-- );











