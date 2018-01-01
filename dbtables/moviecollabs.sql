-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2018 at 12:55 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviecollabs`
--

-- --------------------------------------------------------

--
-- Table structure for table `buddy_list`
--

CREATE TABLE `buddy_list` (
  `buddy_id` int(11) NOT NULL,
  `user_id1` int(11) NOT NULL,
  `user_id2` int(11) NOT NULL,
  `status` enum('requested','accepted','','') NOT NULL DEFAULT 'requested',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buddy_list`
--

INSERT INTO `buddy_list` (`buddy_id`, `user_id1`, `user_id2`, `status`, `created_at`, `updated_at`) VALUES
(8, 8, 15, 'requested', '2017-12-31 14:57:57', NULL),
(10, 8, 14, 'requested', '2018-01-01 06:34:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `covers`
--

CREATE TABLE `covers` (
  `cover_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `covers`
--

INSERT INTO `covers` (`cover_id`, `movie_id`) VALUES
(4, 6),
(5, 7),
(6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `watch_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movie_id` int(11) NOT NULL,
  `episode` int(11) NOT NULL DEFAULT '1',
  `time` float NOT NULL,
  `completed` enum('No','Yes','','') NOT NULL DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('like','dislike','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `movie_id`, `user_id`, `status`) VALUES
(8, 11, 15, 'dislike'),
(9, 11, 8, 'like'),
(10, 11, 14, 'dislike'),
(11, 11, 12, 'dislike'),
(19, 11, 11, 'like'),
(20, 11, 10, 'like'),
(21, 3, 15, 'dislike');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `director` text NOT NULL,
  `cast` text NOT NULL,
  `plot` text NOT NULL,
  `genre` varchar(500) DEFAULT NULL,
  `release_date` date DEFAULT '0000-00-00',
  `rating` float DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `director`, `cast`, `plot`, `genre`, `release_date`, `rating`) VALUES
(1, 'adwqa', 'new', 'new', 'ne', '[\"comedy\",\"sci-fi\",\"horror\",\"romance\",\"action\",\"drama\"]', '2017-12-19', 5),
(2, 'up', 'up', 'up', 'up', '[\"comedy\",\"sci-fi\",\"horror\",\"romance\",\"action\",\"drama\"]', '0000-00-00', 1),
(3, 'dwa', 'dwasd', 'wasd', 'wasd', '[\"comedy\",\"sci-fi\",\"horror\",\"romance\",\"action\",\"drama\"]', '2017-12-20', 0),
(4, 're', 'asd', 'asd', 'asd', '[\"romance\",\"action\"]', '2017-12-07', 1.6),
(5, 'reasd', 'asdasd', 'asdyt', 'asdty', '[\"comedy\",\"sci-fi\",\"horror\",\"romance\",\"action\",\"drama\"]', '2017-12-07', 2.1),
(6, 'movie check', 'check', 'check ', 'mate', '[\"romance\",\"action\"]', '2017-12-05', 2),
(7, 'checking', 'nayim', 'nayim', 'bal kore', '[\"comedy\",\"sci-fi\",\"horror\",\"romance\",\"action\",\"drama\"]', '2017-09-28', 0),
(8, 'ajob', 'ajob', 'asjd', 'feasd', '[\"romance\",\"action\"]', '2017-05-12', 0),
(9, 'ajib', 'asd', 'asda', 'fasdwasd', '[\"romance\",\"action\"]', '2016-09-28', 0),
(10, 'check genre', 'adaw', 'ad', 'adasd', '[\"comedy\",\"sci-fi\",\"horror\",\"romance\",\"action\",\"drama\"]', '2017-08-16', 0),
(11, 'review check', 'check', 'check', 'check', '[\"romance\",\"action\"]', '2017-09-11', 2.5);

-- --------------------------------------------------------

--
-- Table structure for table `my_list`
--

CREATE TABLE `my_list` (
  `my_list_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `my_list`
--

INSERT INTO `my_list` (`my_list_id`, `user_id`, `movie_id`) VALUES
(1, 8, 1),
(2, 8, 3),
(3, 8, 2),
(4, 8, 4),
(5, 8, 5),
(6, 8, 6),
(7, 8, 10);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `text_review` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `movie_id`, `text_review`, `created_at`) VALUES
(1, 9, 12, 'Nice movie bro', '2017-12-28 12:39:17'),
(3, 9, 12, 'valo hoinai baal', '2017-12-28 13:39:01'),
(4, 9, 12, 'khub kharap', '2017-12-28 13:39:36'),
(5, 8, 15, 'Vallagse', '2017-12-28 13:43:50'),
(6, 8, 15, 'Vallagse', '2017-12-28 13:44:08'),
(7, 15, 11, 'ami first', '2017-12-28 16:45:00'),
(8, 15, 11, 'now', '2017-12-29 18:28:39'),
(9, 15, 3, 'yo', '2017-12-31 16:58:27');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `subscription_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `expire_date` date DEFAULT '0000-00-00',
  `movie_count` int(11) NOT NULL DEFAULT '0',
  `status` enum('on','off','expired','paid') NOT NULL DEFAULT 'off'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`subscription_id`, `user_id`, `start_date`, `expire_date`, `movie_count`, `status`) VALUES
(1, 8, '2017-12-18', '2018-01-31', 5, 'paid'),
(2, -1, '2017-12-19', '0000-00-00', 0, 'off'),
(3, 14, '2017-12-19', '0000-00-00', 0, 'off'),
(4, 15, '2017-12-24', '2018-01-28', 0, 'on');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `amount` float NOT NULL,
  `bkash_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `user_id`, `date`, `amount`, `bkash_id`) VALUES
(1, 8, '2017-11-01', 9.99, 145),
(2, 8, '2017-12-01', 9.99, 654),
(3, 8, '2017-12-19', 9.99, 789),
(4, 8, '2017-12-19', 9.99, 0),
(5, 8, '2017-12-19', 9.99, 894),
(6, 15, '2017-12-28', 9.99, 124),
(7, 8, '2017-12-31', 9.99, 458),
(8, 8, '2017-12-31', 9.99, 894);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `type`, `created_at`, `updated_at`) VALUES
(1, 'user', 'user1234', 'user@gmail.com', 0, '2017-12-15 08:40:35', '0000-00-00 00:00:00'),
(5, 'encrypteduser', '$2a$10$1Lxi5s7t0PJvJDzdqGO7au6n0HC0NFSMrCER/iQligT1jUMRQVoOe', 'enc@gmail.com', 0, '2017-12-15 10:48:18', '0000-00-00 00:00:00'),
(6, 'fahim', '$2a$10$IrQcHIaJ7bNy8.Egaa4KuO4Wu9SDwMenkVcRedhdezX2UfsmnAppK', 'fahim@gmfahimail.com', 0, '2017-12-18 16:37:36', '0000-00-00 00:00:00'),
(7, 'fahimkhan', '$2a$10$257QDbSQHDJbliJLSkT3CejNjFl9gmHU1DvG5UQ10KzDkLYfZ7U/u', 'fahimkhan@gmail.com', 0, '2017-12-18 23:35:44', NULL),
(8, 'amar', '$2a$10$B4hH9gxd9AkvS2.R70NBxe5zhrBj.1ZvXreku97a2xaCzL0M/XSTq', 'amar@gmail.com', 0, '2017-12-18 23:38:46', NULL),
(9, 'testing123', '$2a$10$0ewPHlfKCnnLT/qy.Il5Cu4NaxPyoPSoxLaUDoAZ9OOewuKgnEZba', 'testing@gmail.com', 0, '2017-12-19 15:09:57', NULL),
(10, 'okokokok', '$2a$10$KD..lh7eQ8ZHo46KsUlsG.1H.EyHdrhgcW8OqodMFuxqg6Kww5JzK', 'ok@gmail.com', 0, '2017-12-19 19:27:09', NULL),
(11, 'checknew', '$2a$10$KD..lh7eQ8ZHo46KsUlsG.1H.EyHdrhgcW8OqodMFuxqg6Kww5JzK', 'as@gmail.com', 0, '2017-12-19 22:43:57', NULL),
(12, 'registered', '$2a$10$KD..lh7eQ8ZHo46KsUlsG.1H.EyHdrhgcW8OqodMFuxqg6Kww5JzK', 'asdwasd@gmail.com', 0, '2017-12-19 22:52:31', NULL),
(14, 'hobena', '$2a$10$B4hH9gxd9AkvS2.R70NBxe5zhrBj.1ZvXreku97a2xaCzL0M/XSTq', 'fahim@gmail.com', 0, '2017-12-19 22:54:38', NULL),
(15, 'admin', '$2a$10$B4hH9gxd9AkvS2.R70NBxe5zhrBj.1ZvXreku97a2xaCzL0M/XSTq', 'admin@gmail.com', 1, '2017-12-24 20:51:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `watchlist_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `watchlist`
--

INSERT INTO `watchlist` (`watchlist_id`, `user_id`, `movie_id`) VALUES
(1, 8, 1),
(2, 8, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buddy_list`
--
ALTER TABLE `buddy_list`
  ADD PRIMARY KEY (`buddy_id`);

--
-- Indexes for table `covers`
--
ALTER TABLE `covers`
  ADD PRIMARY KEY (`cover_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `my_list`
--
ALTER TABLE `my_list`
  ADD PRIMARY KEY (`my_list_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`subscription_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`watchlist_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buddy_list`
--
ALTER TABLE `buddy_list`
  MODIFY `buddy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `covers`
--
ALTER TABLE `covers`
  MODIFY `cover_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `my_list`
--
ALTER TABLE `my_list`
  MODIFY `my_list_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `subscription_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `watchlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
