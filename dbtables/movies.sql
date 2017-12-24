-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2017 at 04:04 PM
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
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `director` text NOT NULL,
  `cast` text NOT NULL,
  `plot` text NOT NULL,
  `genre` varchar(500) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `director`, `cast`, `plot`, `genre`, `release_date`, `rating`) VALUES
(1, 'adwqa', 'new', 'new', 'ne', NULL, '2017-12-19', NULL),
(2, 'up', 'up', 'up', 'up', NULL, '0000-00-00', NULL),
(3, 'dwa', 'dwasd', 'wasd', 'wasd', NULL, '2017-12-20', NULL),
(4, 're', 'asd', 'asd', 'asd', NULL, '2017-12-07', NULL),
(5, 'reasd', 'asdasd', 'asdyt', 'asdty', NULL, '2017-12-07', NULL),
(6, 'movie check', 'check', 'check ', 'mate', NULL, '2017-12-05', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
