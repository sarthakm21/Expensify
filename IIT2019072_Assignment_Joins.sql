CREATE TABLE Persons(
    P_Id int primary key auto_increment,
    LastName varchar(20),
    FirstName varchar(20),
    Address varchar(20),
    city varchar(20)
);

INSERT INTO Persons VALUES
    (1,"Hansen","OLA","TIMOtevin 10","Sandnes"),
    (2,"svendson","tove","Vorgvn 23","Sandnes"),
    (3,"pettersen","kari","storgt 20","stavanger"),
    (4,"agrass","amit","ahanti2 23","Ssfas"),
    (5,"jain","aparna","names 10","fdfdd");

CREATE TABLE Orders(
	o_id int,
	Order_no int,
    P_id int
    FOREIGN KEY (P_id) REFERENCES Persons(P_Id),
);

INSERT INTO Orders VALUES(1,77895,3), (2,425454,3), (3,565,1), (4,772454,1), (5,433,15);

SELECT Firstname, Lastname, Address, City, Order_no, o_id, o.P_Id
FROM Orders o
JOIN Persons p
ON o.P_Id = p.P_Id;

SELECT p.P_Id, LastName, FirstName, Address, City, OrderNo, o_Id
From Persons p
LEFT JOIN Orders o
ON p.P_Id = o.P_Id;

SELECT p.P_Id, LastName, FirstName, Address, City, OrderNo, o_Id
From Persons p
RIGHT JOIN Orders o
ON p.P_Id = o.P_Id;

SELECT P_Id, LastName, FirstName, Address, City, OrderNo, o_Id
From Persons p
FULL JOIN Orders o
ON p.P_Id = o.P_Id;