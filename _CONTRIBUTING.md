#Contributing to the project

1. FORK 
2. CLONE
3. NPM INSTALL
4. CONFIGURE DATABASE
  * Install MySQL with `brew install mysql`
  * Start MySQL service with `brew services start mysql`
  * Set password for server `mysqladmin -u root password 'password'`
  * Run `mysql -u root -p < database-mysql/schema.sql` in the project's root folder to create db and tables
5. SET DATABASE CONNECTION VARIABLES
6. NPM SCRIPTS
  *`npm run react-dev`
  *`npm run server-dev`
7. `git remote add upstream https://github.com/doordont/doordont.git`

After changes and before submitting pull request
1. `git add` 
2. `git commit`
3. add imperative useful commit message
4. if squashing commits, `git rebase -i` and pick commits
5. `git pull --rebase upstream master`
6. fix conflicts if necessary
7. if conflicts were fixed, `git add` changed files
8. if conflicts were fixed, `git rebase --continue` 
9. --continue working if necessary--
10. if conflicts were fixed, `git commit`
11. `git push origin master`
12. from github fork, create pull request

#Pull Request Process

Individuals cannot merge their own pull requests. Other team members
must review their pull request and merge after inspection. 


#Notifying Team Members of Pushed Changes

After a review and merge of a pull request, team members will notify 
the rest of the team of changes made to the master branch and of the need 
pull changes from upstream. 
`git pull --rebase upstream master`