Feature: Tasks organization
    As a user
    I want to be able to create, remove tasks and dates, and change status of tasks.

    Background:
        Given I open sprint-grid web application page

    @e2e
    Scenario: Create a task row
        When I click on add task plus + button
		Then The add task input field expands
        When I fill task name as 'Task 1'
        When I click on Add button
        Then I am able to create a new task row with 'Task 1'
        When I clear the text in Add task input field
        Then I see the placeholder value as 'Fill the task title, please'
        Then I see validation message for task input field as 'The title is required'
        Then I see validation message text color as 'red'
        Then I see the Add button is disabled
        When I fill task name as 'Task 1'
        Then I see validation message 'The task with such name already exists'
        Then I see the Add button is disabled
        When I click on close 'x' button
        Then The add task input field is collapsed

    @e2e
    Scenario: Create a Date (column)
        When I click on Add date '+' button
        When I fill the date from datepicker as '03/03/2023'
        When I click on Add button
        Then I am able to create a new Date (column) as 'Mar 03, 2023'
        When I clear the date in date input field
        Then I see the placeholder as 'Fill the date, please'
        Then I see validation message 'Date is required'
        Then I see validation message text color 'red'
        Then I see the Add button is disabled
        When I enter date as '02-02-2023'
        Then I see a validation message 'Follow the format mm/dd/yyyy'
        Then I see validation message text color 'red'
        Then I see the Add button is disabled
        When I enter date as '12/32/2022'
        Then I see a validation message 'Follow the format mm/dd/yyyy'
        Then I see the Add button is disabled
        When I enter date as '13/31/2022'
        Then I see a validation message 'Follow the format mm/dd/yyyy'
        Then I see the Add button is disabled
        When I enter date as '12/12/2022'
        When I click on Add button
        Then I am able to create a new Date (column) as 'Dec 12, 2022'
        When I clear the date in date input field
        When I input date As '12/12/2022'
        Then I see validation message 'This date already exists'
        Then I see validation message text color 'red'
        Then I see the Add button is disabled
        When I click on close 'x' button
        Then The date (column) input field is collapsed
    
    @e2e
    Scenario Outline: Assign statuses on empty status cell
        Given A cell has no status set on it
        When I click on cell of the table
        Then The table expands
        Then I see an empty status field
        Then The placeholder text is 'Set Status'
        When I click on empty status field
        Then I see statuses list as 'To Do', 'In Progress', 'In Testing', 'Blocked', 'Done'
        When I click on <status> status
        Then I am able set the status
        Then the table collapse

        |status     |
        |To Do      |
        |In Progress|
        |In Testing |
        |Blocked    | 
        |Done       |
    
    @e2e
    Scenario Outline: Assign statuses on filled status cell
        Given A cell has a <status> set on it
        When I click on cell of the table
        Then The table expands
        Then I see status field has value <status>
        Then The placeholder text is 'Change status'
        When I click on status input field with value <status>
        Then I see statuses list as 'To Do', 'In Progress', 'In Testing', 'Blocked', 'Done'
        When I input "random" text in the status field instead of the required statuses.
        Then The status is not changed
        

        |status     |
        |To Do      |
        |In Progress|
        |In Testing |
        |Blocked    | 
        |Done       |
    
    @e2e
    Scenario Outline: Remove task rows and date (columns)
        Given table contains task rows and date (columns)
        When I hover over the task name
        Then I see remove button (red cross)
        Then I see remove button (red cross) label as 'remove'
        When I click on remove button (red cross)
        Then The task row is deleted
        When I hover over the date
        Then I see remove button (red cross)
        Then I see remove button (red cross) label as 'remove'
        When I click on remove button (red cross)
        Then The date (column) is deleted


