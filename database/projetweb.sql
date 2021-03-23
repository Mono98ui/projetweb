-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Apr 06, 2020 at 07:27 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.12
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET
  AUTOCOMMIT = 0;
START TRANSACTION;
SET
  time_zone = "+00:00";
  /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
  /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
  /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
  /*!40101 SET NAMES utf8mb4 */;
--
  -- Database: `projetweb`
  --
  -- --------------------------------------------------------
  --
  -- Table structure for table `acl`
  --
  DROP TABLE IF EXISTS `acl`;
CREATE TABLE IF NOT EXISTS `acl` (
    `role_id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(40) NOT NULL,
    PRIMARY KEY (`role_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
  -- Dumping data for table `acl`
  --
INSERT INTO `acl` (`role_id`, `title`)
VALUES
  (1, 'administrator'),
  (2, 'regular_user');
-- --------------------------------------------------------
  --
  -- Table structure for table `favorites`
  --
  DROP TABLE IF EXISTS `favorites`;
CREATE TABLE IF NOT EXISTS `favorites` (
    `user_id` int(11) NOT NULL,
    `product_id` int(11) DEFAULT NULL,
    `list_name` varchar(100) DEFAULT NULL,
    KEY `FK_favorites_products_product_id` (`product_id`) USING BTREE,
    KEY `FK_favorites_users_user_id` (`user_id`) USING BTREE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
  -- Dumping data for table `favorites`
  --
INSERT INTO `favorites` (`user_id`, `product_id`, `list_name`)
VALUES
  (4, 2, 'List 2'),
  (4, 3, 'List 1'),
  (4, 4, 'List 2'),
  (4, 5, 'List 1'),
  (4, 6, 'List 1'),
  (4, 8, 'List 1'),
  (4, 11, 'List 1');
-- --------------------------------------------------------
  --
  -- Table structure for table `prices`
  --
  DROP TABLE IF EXISTS `prices`;
CREATE TABLE IF NOT EXISTS `prices` (
    `price_id` int(11) NOT NULL AUTO_INCREMENT,
    `amount` decimal(11, 4) NOT NULL,
    `source` varchar(511) NOT NULL,
    `product_id` int(11) NOT NULL,
    PRIMARY KEY (`price_id`),
    KEY `fk_prices_products_product_id` (`product_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
  -- Dumping data for table `prices`
  --
INSERT INTO `prices` (`price_id`, `amount`, `source`, `product_id`)
VALUES
  (1, '678.0000', 'LOCAL', 2),
  (
    2,
    '669.9900',
    'https://www.newegg.ca/core-i9-9th-gen-intel-core-i9-9900k/p/N82E16819117957',
    2
  ),
  (
    3,
    '669.9900',
    'https://www.amazon.ca/Intel-BX80684I99900K-Boxed-i9-9900K-Processor/dp/B005404P9I/ref=sr_1_1?keywords=core+i9+9900k&qid=1581905131&sr=8-1',
    2
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `products`
  --
  DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
    `product_id` int(11) NOT NULL AUTO_INCREMENT,
    `model` varchar(100) NOT NULL,
    `manufacturer` varchar(100) NOT NULL,
    `type` varchar(100) NOT NULL,
    `description` text,
    `image` text,
    PRIMARY KEY (`product_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
  -- Dumping data for table `products`
  --
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    2,
    'Core i9-9900K',
    'Intel',
    'CPU',
    '{\r\n  \"NumberOfCores\": 8,\r\n  \"NumberOfThreads\": 16,\r\n  \"CoreClock\": \"3.6 GHz\",\r\n  \"BoostClock\": \"5 GHz\",\r\n  \"TDP\": \"95 W\",\r\n  \"Series\": \"Intel Core i9\",\r\n  \"Microarchitecture\": \"Coffee Lake Refresh\",\r\n  \"Lithography\": \"14 nm\",\r\n  \"Socket\": \"LGA1151\"\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.techspot.com%2Fimages2%2Fnews%2Fbigimage%2F2018%2F10%2F2018-10-01-image-28.jpg&f=1&nofb=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    3,
    'RYZEN 9 3900X',
    'AMD',
    'CPU',
    '{\r\n  \"NumberOfCores\": 12,\r\n  \"NumberOfThreads\": 24,\r\n  \"CoreClock\": \"3.8 GHz\",\r\n  \"BoostClock\": \"4.6 GHz\",\r\n  \"TDP\": \"105 W\",\r\n  \"Series\": \"AMD Ryzen 9\",\r\n  \"Microarchitecture\": \"Zen 2\",\r\n  \"Lithography\": \"7 nm\",\r\n  \"Socket\": \"AM4\"\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.evetech.co.za%2Frepository%2FProductImages%2Famd-ryzen-9-3900x-processor-south-africa-1000px-v1-0002.jpg&f=1&nofb=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    4,
    'EVGA GeForce RTX 2080 Ti FTW3 ULTRA GAMING',
    'EVGA',
    'GPU',
    '{\r\n  \"Provider\": \"NVIDIA\",\r\n  \"Series\": \"NVIDIA GeForce RTX 20 Series\",\r\n  \"Chipset\": \"GeForce RTX 2080 Ti\",\r\n  \"CoreClock\": \"1350 MHz\",\r\n  \"BoostClock\": \"1755 MHz\",\r\n  \"Memory\": \"11 GB\",\r\n  \"MemoryType\": \"GDDR6\",\r\n  \"FrameSync\": \"G-Sync\",\r\n  \"TDP\": \"250 W\",\r\n  \"RGB\": true\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.evga.com%2Fproducts%2Fgallery%2Fpng%2F11G-P4-2487-KR_XL_1.png&f=1&nofb=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    5,
    'NVIDIA TITAN RTX',
    'NVIDIA',
    'GPU',
    '{\r\n  \"Provider\": \"NVIDIA\",\r\n  \"Series\": \"NVIDIA TITAN RTX\",\r\n  \"Chipset\": \"TITAN RTX\",\r\n  \"CoreClock\": \"1350 MHz\",\r\n  \"BoostClock\": \"1770 MHz\",\r\n  \"Memory\": \"24 GB\",\r\n  \"MemoryType\": \"GDDR6\",\r\n  \"FrameSync\": \"G-Sync\",\r\n  \"TDP\": \"280 W\",\r\n  \"RGB\": false\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bhphotovideo.com%2Fimages%2Fimages1500x1500%2Fnvidia_900_1g150_2500_000_geforce_titan_rtx_2080_1448906.jpg&f=1&nofb=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    6,
    'G.Skill Trident Z RGB',
    'G.Skill',
    'RAM',
    '{\r\n  \"Frequency\": \"3200 MHz\",\r\n  \"CASLatency\": 16,\r\n  \"Modules\": \"2 x 8GB\",\r\n  \"RGB\": true\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kvFhOqGVECMyugt9k_8UqAHaHa%26pid%3DApi&f=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    7,
    'Corsair Vengeance LPX',
    'Corsair',
    'RAM',
    '{\r\n  \"Frequency\": \"3000 MHz\",\r\n  \"CASLatency\": 15,\r\n  \"Modules\": \"2 x 8GB\",\r\n  \"RGB\": false\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.ebyrcdn.net%2F732307-739888-800.jpg&f=1&nofb=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    8,
    'Gigabyte Z390 AORUS PRO WIFI',
    'Gigabyte',
    'MOBO',
    '{\r\n  \"Socket\": \"LGA1151\",\r\n  \"Chipset\": \"Intel Z390\",\r\n  \"FormFactor\": \"ATX\",\r\n  \"MemoryType\": \"DDR4\",\r\n  \"WifiSupport\": true,\r\n  \"RGB\": true\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.gigabyte.com%2FProduct%2F2%2F6639%2F2019012514500381ca8692c2ae0204a26ad2d945de5522fc_big.png&f=1&nofb=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    9,
    'MSI B450 TOMAHAWK',
    'MSI',
    'MOBO',
    '{\r\n  \"Socket\": \"AM4\",\r\n  \"Chipset\": \"AMD B450\",\r\n  \"FormFactor\": \"ATX\",\r\n  \"MemoryType\": \"DDR4\",\r\n  \"WifiSupport\": false,\r\n  \"RGB\": true\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fasset.msi.com%2Fresize%2Fimage%2Fglobal%2Fproduct%2Fproduct_7_20180716111704_5b4c0e302f5a9.png62405b38c58fe0f07fcef2367d8a9ba1%2F1024.png&f=1&nofb=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    10,
    'Seagate Barracuda Compute 2 TB 3.5\" 7200RPM Internal Hard Drive',
    'Seagate',
    'STORAGE',
    '{\r\n  \"Type\": \"7200 RPM\",\r\n  \"Capacity\": \"2 TB\",\r\n  \"Cache\": \"256 MB\",\r\n  \"FormFactor\": \"3.5\\\" \"\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fecx.images-amazon.com%2Fimages%2FI%2F41H888-QJdL.jpg&f=1&nofb=1'
  );
INSERT INTO `products` (
    `product_id`,
    `model`,
    `manufacturer`,
    `type`,
    `description`,
    `image`
  )
VALUES
  (
    11,
    'Samsung 970 Evo 1 TB M.2-2280 NVME Solid State Drive',
    'Samsung',
    'STORAGE',
    '{\r\n  \"Type\": \"NVMe\",\r\n  \"Capacity\": \"1 TB\",\r\n  \"Cache\": \"1024 MB\",\r\n  \"FormFactor\": \"M.2-2280\"\r\n}',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage-us.samsung.com%2FSamsungUS%2Fhome%2Fcomputing%2Fmemory-and-storage%2Fsolid-state-drives%2Fpdp%2Fmz-v7e1t0bw%2Fgallery-update-10-01-18%2F001_gallery_MZ-V7E1T0BW_10-01-18.jpg%3F%24product-details-jpg%24&f=1&nofb=1'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `reviews`
  --
  DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
    `review_id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(63) NOT NULL,
    `rating` int(11) NOT NULL,
    `description` text,
    `user_id` int(11) NOT NULL,
    `product_id` int(11) NOT NULL,
    PRIMARY KEY (`review_id`),
    KEY `FK_reviews_users_user_id` (`user_id`),
    KEY `FK_reviews_products_product_id` (`product_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
  -- Dumping data for table `reviews`
  --
INSERT INTO `reviews` (
    `review_id`,
    `title`,
    `rating`,
    `description`,
    `user_id`,
    `product_id`
  )
VALUES
  (1, 'Great Product!', 4, NULL, 5, 4),
  (
    2,
    'Could\'ve been better',
    2,
    'Can\'t beat the AMD Ryzen 3900X',
    5,
    2
  ),
  (
    3,
    'Value for performance',
    5,
    'Best CPU of the year. Clear winner in all scenarios',
    5,
    3
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `users`
  --
  DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(40) NOT NULL,
    `password` varchar(120) NOT NULL,
    `first_name` varchar(60) DEFAULT NULL,
    `last_name` varchar(60) DEFAULT NULL,
    `email` varchar(40) NOT NULL,
    `role` int(11) DEFAULT NULL,
    PRIMARY KEY (`user_id`),
    KEY `FK_users_acl_role_id` (`role`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
  -- Dumping data for table `users`
  --
INSERT INTO `users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `last_name`,
    `email`,
    `role`
  )
VALUES
  (
    4,
    'favoriteUser',
    '5f4dcc3b5aa765d61d8327deb882cf99',
    'John',
    'Doe',
    'johndoe@mail.com',
    2
  ),
  (
    5,
    'reviewUser',
    '5f4dcc3b5aa765d61d8327deb882cf99',
    'Tomás',
    ' De Torquemada',
    'executor@spanish.inquisition.org',
    2
  ),
  (
    6,
    'neo',
    '5f4dcc3b5aa765d61d8327deb882cf99',
    'Thomas',
    'Anderson',
    'neo@matrix.com',
    1
  );
--
  -- Constraints for dumped tables
  --
  --
  -- Constraints for table `favorites`
  --
ALTER TABLE `favorites`
ADD
  CONSTRAINT `FK_Product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE
SET
  NULL ON UPDATE CASCADE,
ADD
  CONSTRAINT `FK_User_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
  -- Constraints for table `prices`
  --
ALTER TABLE `prices`
ADD
  CONSTRAINT `fk_prices_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
  -- Constraints for table `reviews`
  --
ALTER TABLE `reviews`
ADD
  CONSTRAINT `FK_reviews_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `FK_reviews_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
  -- Constraints for table `users`
  --
ALTER TABLE `users`
ADD
  CONSTRAINT `FK_role_id` FOREIGN KEY (`role`) REFERENCES `acl` (`role_id`) ON DELETE
SET
  NULL ON UPDATE CASCADE;
COMMIT;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
